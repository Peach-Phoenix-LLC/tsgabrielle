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
      
      {/* Overlay to catch clicks and prevent YouTube interaction */}
      <div className="absolute inset-0 bg-transparent z-10" />

      {/* Optional: Add a subtle logo or home link if needed, but the user requested "without text" */}
    </div>
  );
}

