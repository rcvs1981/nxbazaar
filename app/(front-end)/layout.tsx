import Footer from "@/components/frontend/Footer";
import Navbar from "@/components/frontend/Navbar";
import DeliverWrapper from "@/components/location/DeliverWrapper";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DeliverWrapper>
      <div className="min-h-screen flex flex-col relative overflow-hidden">

        {/* 🔥 ANIMATED BACKGROUND */}
        <div className="absolute inset-0 -z-30">
          <div className="h-full w-full bg-animated opacity-30" />
        </div>

        {/* 🔥 GLOW BLOBS (OPTIMIZED) */}
        <div className="absolute inset-0 -z-20 pointer-events-none">

          <div className="absolute w-[400px] h-[400px] bg-orange-500 rounded-full blur-[120px] opacity-30 top-10 left-10 animate-pulse" />

          <div className="absolute w-[400px] h-[400px] bg-sky-500 rounded-full blur-[120px] opacity-30 bottom-10 right-10 animate-pulse" />

        </div>

        {/* 🔥 OPTIONAL OVERLAY (READABILITY FIX) */}
        <div className="absolute inset-0 -z-10 bg-black/10 dark:bg-black/30" />

        {/* NAVBAR */}
        <Navbar />

        {/* MAIN */}
        <main className="pt-24 flex-1 relative z-10">
          <div className="max-w-7xl mx-auto px-4 lg:px-16">
            {children}
          </div>
        </main>

        {/* FOOTER */}
        <Footer />

      </div>
    </DeliverWrapper>
  );
}