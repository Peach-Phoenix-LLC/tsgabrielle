export default function CollectionHeader({
  title,
  subtitle,
  description,
  shortDescription,
  slogans,
  textColor = "#111111",
}: {
  title: string;
  subtitle?: string | null;
  description?: string | null;
  shortDescription?: string | null;
  slogans?: string[] | null;
}) {
  return (
    <header className="container-luxe py-16 text-center">
      <h1 className="font-light text-5xl tracking-wide text-[#111111]">{title}</h1>

      {shortDescription && (
        <p className="mt-5 max-w-2xl mx-auto text-xl text-[#333333] font-light leading-relaxed italic">
          {shortDescription}
        </p>
      )}

      {slogans && slogans.length > 0 && (
        <ul className="mt-6 flex flex-wrap justify-center gap-3">
          {slogans.map((s) => (
            <li
              key={s}
              className="rounded-full border border-primary/30 px-4 py-1.5 text-xs font-semibold tracking-widest text-primary uppercase"
            >
              {s}
            </li>
          ))}
        </ul>
      )}

      {description && (
        <p className="mt-8 max-w-3xl mx-auto text-base text-[#555555] font-light leading-loose whitespace-pre-line">
  textColor?: string;
}) {
  return (
    <header className="container-luxe py-16 text-center">
      {subtitle && (
        <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: textColor }}>
          {subtitle}
        </p>
      )}
      <h1 className="font-light text-5xl tracking-wide" style={{ color: textColor }}>{title}</h1>
      {description && (
        <p className="mt-6 max-w-2xl mx-auto text-lg font-light leading-relaxed" style={{ color: textColor }}>
          {description}
        </p>
      )}
    </header>
  );
}
