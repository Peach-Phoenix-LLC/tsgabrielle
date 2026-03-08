export default function CollectionHeader({
  title,
  subtitle,
  description,
  textColor = "#111111",
}: {
  title: string;
  subtitle?: string | null;
  description?: string | null;
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
