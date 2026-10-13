import type { Metadata } from "next";
import Link from "next/link";
import { RouteFrame } from "@/components/RouteFrame";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  title: "CV",
  description: "Curriculum vitae for Atharva Gite.",
};

export default function CvPage() {
  return (
    <RouteFrame>
      <main id="main" className="cv-page">
        <div className="wrap">
          <p className="back-link">
            <Link href="/" transitionTypes={["nav-back"]}>
              Home
            </Link>
          </p>
          <p className="cv-download">
            <a href={profile.cv} download>
              Download PDF
            </a>
          </p>
          <div className="cv-sheets">
            {profile.cvSheets.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`Atharva Gite CV, page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </main>
    </RouteFrame>
  );
}
