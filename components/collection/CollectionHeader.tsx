export default function CollectionHeader({
  title,
  description,
  shortDescription,
  slogans,
}: {
  title: string;
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
          {description}
        </p>
      )}
    </header>
  );
}
