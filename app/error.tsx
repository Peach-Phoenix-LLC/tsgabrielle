"use client";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <section className="container-luxe py-20">
      <h1 className="font-display text-4xl">Something went wrong</h1>
      <p className="mt-2 text-night/70">{error.message}</p>
    </section>
  );
}
