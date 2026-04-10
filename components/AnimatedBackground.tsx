// components/ui/AnimatedBg.tsx

export default function AnimatedBg() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute w-[800px] h-[800px] bg-purple-500/30 rounded-full blur-3xl top-[-200px] left-[-200px] animate-pulse" />
      <div className="absolute w-[600px] h-[600px] bg-pink-500/30 rounded-full blur-3xl bottom-[-150px] right-[-150px] animate-pulse" />
      <div className="absolute w-full h-full bg-gradient-to-br from-black/40 via-transparent to-black/40" />
    </div>
  );
}