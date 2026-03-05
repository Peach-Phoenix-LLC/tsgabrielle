import Link from "next/link";

export default function NotFound() {

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black z-[9999]">
      {/* Background Video Container */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-[177.77777778vh] h-[56.25vw] pointer-events-none select-none">
        <iframe
          src="https://www.youtube.com/embed/cqFGFRERCiM?autoplay=1&mute=1&loop=1&playlist=cqFGFRERCiM&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1"
          className="w-full h-full border-none opacity-100 transition-opacity duration-1000"
          allow="autoplay; encrypted-media"
          loading="lazy"
        />
      </div>
      
      <div className="absolute inset-0 bg-transparent z-10" />

      <div className="absolute top-10 left-10 z-20">
        <Link href="/" className="text-white text-xs uppercase tracking-widest px-6 py-3 border border-white/20 hover:bg-white hover:text-black transition-all">
          Return Home
        </Link>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/40 text-[10px] uppercase tracking-widest">
        tsgabrielle® · 404 Page Not Found
      </div>

    </div>
  );
}

