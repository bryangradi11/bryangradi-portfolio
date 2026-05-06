export default function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div
        className="absolute -top-1/3 -right-1/4 h-[800px] w-[800px] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.05) 40%, transparent 70%)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(10,14,26,0.4) 100%)",
        }}
      />
    </div>
  );
}
