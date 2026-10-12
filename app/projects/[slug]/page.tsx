import type { Metadata } from "next";
import { ViewTransition } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CountFigure } from "@/components/CountFigure";
import { ExternalLink } from "@/components/ExternalLink";
import { Reveal } from "@/components/Reveal";
import { RouteFrame } from "@/components/RouteFrame";
import { ThemeScope } from "@/components/ThemeScope";
import { projects } from "@/lib/content";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function findProject(slug: string) {
  return projects.find((project) => project.id === slug);
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  return (
    <RouteFrame>
      <main id="main" className="project-page">
        <ThemeScope theme={project.theme} />
        <div className="wrap">
          <p className="back-link">
            <Link href="/#work" transitionTypes={["nav-back"]}>
              Work
            </Link>
          </p>
          <header className="project-hero">
            <p className="project-kicker">
              <span>{project.category}</span>
            </p>
            <ViewTransition
              name={`project-${project.id}`}
              share="morph"
              default="none"
            >
              <h1>{project.name}</h1>
            </ViewTransition>
            <p className="lede">{project.summary}</p>
            <ul className="chips" aria-label="Technologies">
              {project.stack.map((item, chipIndex) => (
                <li
                  key={item}
                  className="chip"
                  style={{ ["--i" as string]: chipIndex }}
                >
                  {item}
                </li>
              ))}
            </ul>
            {project.figures ? (
              <ul className="figures">
                {project.figures.map((figure) => (
                  <li key={figure.value}>
                    <CountFigure value={figure.value} />
                    <span>{figure.caption}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="project-actions">
              {project.links.map((link) => (
                <ExternalLink key={link.href} href={link.href} className="action">
                  {link.label}
                </ExternalLink>
              ))}
            </div>
          </header>
          <div className="project-detail page-detail">
            {project.details.map((section, sectionIndex) => (
              <Reveal key={section.heading} delay={sectionIndex * 40}>
                <section className="detail-block">
                  <h2>{section.heading}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.steps ? (
                    <ol className="pipeline">
                      {section.steps.map((step, stepIndex) => (
                        <li key={step}>
                          <span>{String(stepIndex + 1).padStart(2, "0")}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  ) : null}
                  {section.bullets ? (
                    <ul className="detail-list">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
    </RouteFrame>
  );
}
