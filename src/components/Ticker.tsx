// Scrolling announcement bar at the very top of the page.
// Edit the messages below; they loop seamlessly.

const messages = [
  "Paper published in Scientific Reports",
  "3D-printed lamps",
  "Mechanical engineer in Copenhagen",
  "Free CFD calculators online",
  "Open to new roles",
];

const Row = () => (
  <div className="flex shrink-0 items-center" aria-hidden="true">
    {messages.map((m) => (
      <span key={m} className="flex items-center">
        <span className="px-6 whitespace-nowrap">{m}</span>
        <span className="h-1 w-1 rounded-full bg-mint/50" />
      </span>
    ))}
  </div>
);

const Ticker = () => (
  <div className="relative z-[60] h-9 overflow-hidden bg-teal text-mint">
    <span className="sr-only">{messages.join(". ")}</span>
    <div
      className="marquee flex h-full w-max items-center text-[11px] font-medium uppercase tracking-[0.14em]"
      style={{ ["--marquee-duration" as string]: "45s" }}
    >
      {/* Content repeated so the -50% translation loops without a jump */}
      <Row />
      <Row />
      <Row />
      <Row />
    </div>
  </div>
);

export default Ticker;
