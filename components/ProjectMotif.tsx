import type { ProjectTheme } from "@/lib/content";

export function ProjectMotif({ theme }: { theme: ProjectTheme }) {
  return (
    <svg
      className={`project-motif motif-${theme}`}
      viewBox="0 0 72 72"
      aria-hidden="true"
    >
      {theme === "study" ? (
        <>
          <path className="draw" pathLength="1" d="M16 50 L36 24 L56 50" />
          <circle className="node n1" cx="16" cy="50" r="3.2" />
          <circle className="node n2" cx="36" cy="24" r="3.2" />
          <circle className="node n3" cx="56" cy="50" r="3.2" />
        </>
      ) : null}
      {theme === "yield" ? (
        <>
          <circle className="node n1" cx="12" cy="50" r="2.2" />
          <circle className="node n2" cx="26" cy="42" r="2.2" />
          <circle className="node n3" cx="40" cy="28" r="2.2" />
          <circle className="node n4" cx="54" cy="22" r="2.2" />
          <circle className="node n5" cx="64" cy="18" r="2.2" />
          <path
            className="draw"
            pathLength="1"
            d="M10 54 C22 52 28 40 40 30 C50 22 58 20 66 16"
          />
        </>
      ) : null}
      {theme === "pairs" ? (
        <>
          <path className="draw line-a" pathLength="1" d="M8 28 H64" />
          <path className="draw line-b" pathLength="1" d="M8 44 H64" />
        </>
      ) : null}
      {theme === "folio" ? (
        <>
          <path className="rail" d="M10 36 H62" />
          <rect className="marker" x="14" y="26" width="12" height="20" rx="1.5" />
        </>
      ) : null}
      {theme === "book" ? (
        <>
          <rect className="tick t1" x="8" y="16" width="24" height="3" />
          <rect className="tick t2" x="40" y="16" width="24" height="3" />
          <rect className="tick t3" x="8" y="34" width="18" height="3" />
          <rect className="tick t4" x="46" y="34" width="18" height="3" />
          <rect className="tick t5" x="8" y="52" width="12" height="3" />
          <rect className="tick t6" x="52" y="52" width="12" height="3" />
        </>
      ) : null}
    </svg>
  );
}
