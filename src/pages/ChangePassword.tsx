import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const valid = password.length >= 8 && password === confirm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || !user) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      // Clear must_change_password flag on matching employee
      await supabase
        .from("employees")
        .update({ must_change_password: false } as any)
        .eq("email", user.email || "");

      toast.success("Mot de passe mis à jour avec succès !");
      navigate("/equipe-du-jour", { replace: true });
    } catch (err: any) {
      toast.error(err.message || "Erreur lors du changement de mot de passe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Changement de Mot de Passe</CardTitle>
          <CardDescription>
            Bienvenue ! Pour des raisons de sécurité, veuillez choisir un nouveau mot de passe avant de continuer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nouveau mot de passe</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 caractères"
                minLength={8}
              />
              {password.length > 0 && password.length < 8 && (
                <p className="text-xs text-destructive mt-1">Le mot de passe doit contenir au moins 8 caractères</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Confirmer le mot de passe</label>
              <Input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirmez votre mot de passe"
              />
              {confirm.length > 0 && password !== confirm && (
                <p className="text-xs text-destructive mt-1">Les mots de passe ne correspondent pas</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={!valid || loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
              Valider
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
