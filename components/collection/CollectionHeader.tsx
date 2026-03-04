export default function CollectionHeader({
  title,
  description,
}: {
  title: string;
  description?: string | null;
}) {
  return (
    <header className="container-luxe py-16 text-center">
      <h1 className="font-light text-5xl tracking-wide text-[#111111]">{title}</h1>
      {description && (
        <p className="mt-6 max-w-2xl mx-auto text-lg text-[#555555] font-light leading-relaxed">
          {description}
        </p>
      )}
    </header>
  );
}
