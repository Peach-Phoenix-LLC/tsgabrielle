import Breadcrumbs from "@/components/layout/Breadcrumbs";

export default function CollectionHeader({
  title,
  subtitle,
  description,
  longDescription,
  slogans,
  textColor = "#111111",
}: {
  title: string;
  subtitle?: string | null;
  description?: string | null;
  longDescription?: string | null;
  slogans?: string[];
  textColor?: string;
}) {
  return (
    <>
      <Breadcrumbs textColor={textColor} />
      <header className="container-luxe py-8 text-center max-w-4xl mx-auto">
        {subtitle && (
        <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: textColor, opacity: 0.7 }}>
          {subtitle}
        </p>
      )}
      <h1 className="font-light text-5xl md:text-6xl tracking-wide uppercase" style={{ color: textColor }}>{title}</h1>
      {description && (
        <p className="mt-6 text-lg md:text-xl font-light leading-relaxed" style={{ color: textColor }}>
          {description}
        </p>
      )}
      {longDescription && (
        <p className="mt-4 text-sm md:text-base leading-relaxed text-justify md:text-center" style={{ color: textColor, opacity: 0.8 }}>
          {longDescription}
        </p>
      )}
      {slogans && slogans.length > 0 && (
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {slogans.map((slogan, idx) => (
            <span key={idx} className="text-xs uppercase tracking-widest border px-4 py-2 rounded-sm" style={{ color: textColor, borderColor: `${textColor}30`, backgroundColor: `${textColor}05` }}>
              {slogan}
            </span>
          ))}
        </div>
      )}
      </header>
    </>
  );
}
