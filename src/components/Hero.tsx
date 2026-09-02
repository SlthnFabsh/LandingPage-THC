export default function Hero() {
  return (
    <section id="beranda" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-950">
      {/* Hero Video Background */}
      <div className="hero-video-wrapper">
        <video autoPlay loop muted playsInline className="hero-video opacity-85">
          <source src="/assets/video/hero2.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="hero-video-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-[2.8rem] font-black leading-[0.9] tracking-[-0.06em] sm:text-[4.5rem] md:text-[7rem] lg:text-[8.5rem]">
          <span className="block">#To The Next</span>
          <span className="block">Level !</span>
        </h1>

        <p className="mt-8 text-[1.4rem] font-semibold tracking-[-0.04em] sm:text-[2rem] md:text-[2.8rem]">
          Your Connection, Our Commitment.
        </p>
      </div>
    </section>
  );
}