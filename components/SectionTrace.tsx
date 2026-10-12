const paths = {
  yield: "M0 92C150 92 230 74 330 56C450 34 560 22 700 18C880 12 1020 16 1200 6",
  wave: "M0 46C50 46 70 14 120 14C170 14 190 78 250 78C310 78 330 18 400 18C470 18 490 74 560 74C630 74 660 24 740 24C840 24 900 58 1200 36",
  arc: "M0 64C200 64 320 28 520 24C760 18 940 40 1200 16",
} as const;

export function SectionTrace({
  kind,
}: {
  kind: "yield" | "wave" | "book" | "nodes" | "arc";
}) {
  if (kind === "book") {
    return (
      <svg
        className="section-trace is-book"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          pathLength="1"
          d="M0 10H460M0 26H820M0 42H280M0 58H960M0 72H540"
        />
      </svg>
    );
  }

  if (kind === "nodes") {
    return (
      <svg
        className="section-trace is-nodes"
        viewBox="0 0 1200 64"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path pathLength="1" d="M24 32H1176" />
        {[80, 220, 390, 560, 760, 940, 1100].map((x) => (
          <circle key={x} cx={x} cy="32" r="5" />
        ))}
      </svg>
    );
  }

  return (
    <svg
      className="section-trace"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path pathLength="1" d={paths[kind]} />
    </svg>
  );
}
