import DinoGame from "../components/DinoGame";

export const metadata = {
  title: "We’ll be back soon | Inspire Group",
  description: "Scheduled maintenance in progress. We’ll be back shortly.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-950 to-black text-white flex items-center justify-center p-6 overflow-hidden">
      <div className="max-w-3xl w-full">
        <div className="relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-2xl">
          {/* Animated background orbs */}
          <div className="pointer-events-none absolute -top-32 -right-28 h-80 w-80 rounded-full bg-blue-600/25 blur-3xl animate-spin-slow" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl animate-spin-slower" />

          <div className="relative px-8 py-10 sm:px-12 sm:py-14">
            <div className="flex items-center gap-4">
              <img src="/images/inspirelogo.png" alt="Inspire Group" className="h-12 w-12 rounded-xl bg-white/90 p-2 shadow" />
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">We’ll be back soon</h1>
            </div>

            <p className="mt-6 text-slate-200 leading-relaxed">
              We’re upgrading our platform to serve you better. The site will be unavailable while we
              complete these changes. We’ll be back as soon as possible, but some updates may take up
              to a few weeks. Thank you for your patience and understanding.
            </p>

            {/* Interactive Dino mini-game */}
            <div className="mt-10">
              <DinoGame />
            </div>

            {/* Contact and social links removed per request */}

            <p className="mt-8 text-xs text-slate-400">
              © {new Date().getFullYear()} Inspire Asset. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}



