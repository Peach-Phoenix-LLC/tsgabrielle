export function ContentPage({ title, body }: { title: string; body: string }) {
  return (
    <section className="container-luxe py-14">
      <h1 className="font-display text-4xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-night/80">{body}</p>
    </section>
  );
}
