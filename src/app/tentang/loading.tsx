export default function TentangLoading() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-slate-50">
      <div className="relative animate-pulse">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/logo1.webp"
          alt=""
          className="mb-6 h-20 w-auto object-contain brightness-0"
        />
        <p className="text-center text-sm font-semibold tracking-widest text-slate-400">
          LOADING
        </p>
      </div>
    </div>
  );
}