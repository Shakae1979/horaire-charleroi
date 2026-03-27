import { useI18n, Lang } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex items-center rounded-md overflow-hidden border" style={{ borderColor: "hsl(var(--sidebar-fg) / 0.2)" }}>
      {(["fr", "nl"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="px-2 py-1 text-[11px] font-semibold uppercase transition-colors"
          style={{
            background: lang === l ? "hsl(var(--sidebar-active))" : "transparent",
            color: lang === l ? "hsl(var(--accent-foreground))" : "hsl(var(--sidebar-fg) / 0.6)",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
