import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-[70vh] w-full flex flex-col items-center justify-center bg-black overflow-hidden -mt-[100px] lg:-mt-[112px]">
      {/* Background Video Container */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-40">
        <iframe
          src="https://www.youtube.com/embed/cqFGFRERCiM?autoplay=1&mute=1&loop=1&playlist=cqFGFRERCiM&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1"
          className="w-full h-full border-none scale-150"
          allow="autoplay; encrypted-media"
          loading="lazy"
        />
      </div>
      
      <div className="relative z-10 text-center space-y-8 px-4">
        <h1 className="text-white text-5xl md:text-8xl font-light uppercase tracking-tighter">404</h1>
        <p className="text-white/60 text-sm uppercase tracking-[0.4em] font-light">The dimension you seek is not found</p>
        <Link href="/" className="btn-holographic-outline !text-white !border-white/20 hover:!bg-white hover:!text-black transition-all">
          Return Home
        </Link>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/20 text-[10px] uppercase tracking-widest pointer-events-none">
        tsgabrielle® · Lost in the Universe
      </div>
    </div>
  );
}

