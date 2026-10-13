import { AnimatedDetails } from "@/components/AnimatedDetails";
import { DrawLine } from "@/components/DrawLine";
import { ExternalLink } from "@/components/ExternalLink";
import { HeroName } from "@/components/HeroName";
import { BrandIcon, CvIcon, MailIcon, PhoneIcon } from "@/components/Icons";
import { Magnetic } from "@/components/Magnetic";
import { ProjectArticle } from "@/components/ProjectArticle";
import { Reveal } from "@/components/Reveal";
import { RouteFrame } from "@/components/RouteFrame";
import { SectionTrace } from "@/components/SectionTrace";
import { SpotSurface } from "@/components/SpotSurface";
import {
  about,
  education,
  kclCourses,
  ledeHits,
  profile,
  projects,
  roles,
  skillGroups,
  socialLinks,
  spitCoursework,
  workIntro,
} from "@/lib/content";

const workLead = ["studyforge", "yield-curve", "pairs"] as const;

const orderedProjects = [
  ...workLead.flatMap((id) => {
    const project = projects.find((item) => item.id === id);
    return project ? [project] : [];
  }),
  ...projects.filter((project) => !workLead.includes(project.id as (typeof workLead)[number])),
];

export default function Home() {
  return (
    <RouteFrame>
    <main id="main">
      <div className="wrap">
        <header id="top" className="intro">
          <svg
            className="hero-trace"
            viewBox="0 0 1200 180"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <filter id="hero-comet-glow" x="-250%" y="-250%" width="600%" height="600%">
                <feGaussianBlur stdDeviation="16" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              id="hero-signal"
              pathLength="1"
              d="M0 132C96 132 168 124 248 108C348 88 410 66 512 56C630 44 724 34 860 28C1004 22 1104 20 1200 16"
            />
            <circle className="hero-comet hero-comet-tail" r="8" opacity="0.45">
              <animateMotion
                dur="6.5s"
                begin="1.35s"
                repeatCount="indefinite"
                keyPoints="0;1;0"
                keyTimes="0;0.5;1"
                calcMode="spline"
                keySplines="0.45 0 0.2 1;0.45 0 0.2 1"
              >
                <mpath href="#hero-signal" />
              </animateMotion>
            </circle>
            <circle className="hero-comet" r="18" filter="url(#hero-comet-glow)">
              <animateMotion
                dur="6.5s"
                begin="0.9s"
                repeatCount="indefinite"
                keyPoints="0;1;0"
                keyTimes="0;0.5;1"
                calcMode="spline"
                keySplines="0.45 0 0.2 1;0.45 0 0.2 1"
              >
                <mpath href="#hero-signal" />
              </animateMotion>
            </circle>
          </svg>
          <HeroName name={profile.name} links={socialLinks.slice(0, 2)} />
          <span className="name-rule" aria-hidden="true" />
          <p className="credential">{profile.credential}</p>
          <p className="lede-lockup">
            {ledeHits.map((hit, index) => (
              <span key={hit} style={{ ["--i" as string]: index }}>
                {hit}
              </span>
            ))}
          </p>
          <p className="lede-aside">{profile.lede}</p>
        </header>

        <section id="work" className="section">
          <Reveal>
            <div className="section-heading">
              <h2>Work</h2>
              <p className="work-intro">
                {workIntro[0]}
                <br />
                {workIntro[1]}
              </p>
            </div>
          </Reveal>
          <div className="projects">
            {orderedProjects.map((project, index) => (
              <Reveal key={project.id} delay={index * 70}>
                <ProjectArticle project={project} index={index + 1} />
              </Reveal>
            ))}
          </div>
          <SectionTrace kind="yield" />
        </section>

        <Reveal>
          <section id="experience" className="section">
            <div className="section-heading">
              <h2>Experience</h2>
            </div>
            <DrawLine>
              {roles.map((role) => (
                <article key={`${role.title}-${role.dates}`} className="role">
                  <span className="marker" aria-hidden="true" />
                  <div className="role-head">
                    <h3>{role.title}</h3>
                    <p className="dates">{role.dates}</p>
                    <p className="org">{role.org}</p>
                  </div>
                  {role.figures ? (
                    <ul className="figures">
                      {role.figures.map((figure) => (
                        <li key={figure.value}>
                          <strong>{figure.value}</strong>
                          <span>{figure.caption}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <ul className="points">
                    {role.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </DrawLine>
            <SectionTrace kind="book" />
          </section>
        </Reveal>

        <Reveal>
          <section id="education" className="section">
            <div className="section-heading">
              <h2>Education</h2>
            </div>
            <div className="schools">
              <SpotSurface as="article" className="school">
                <div className="role-head">
                  <h3>{education[0].school}</h3>
                  <p className="dates">{education[0].dates}</p>
                  <p className="org">{education[0].credential}</p>
                </div>
                <p className="meta">{education[0].detail}</p>
                <AnimatedDetails className="disclosure course-fold" summary="MSc modules">
                  {education[0].note ? <p className="fold-note">{education[0].note}</p> : null}
                  <ul className="course-list">
                    {kclCourses.map((course) => (
                      <li key={course}>{course}</li>
                    ))}
                  </ul>
                </AnimatedDetails>
              </SpotSurface>

              <SpotSurface as="article" className="school">
                <div className="role-head">
                  <h3>{education[1].school}</h3>
                  <p className="dates">{education[1].dates}</p>
                  <p className="org">{education[1].credential}</p>
                </div>
                <p className="meta">{education[1].detail}</p>
                <AnimatedDetails
                  className="disclosure course-fold"
                  summary="Undergraduate coursework"
                >
                  {education[1].note ? <p className="fold-note">{education[1].note}</p> : null}
                  {spitCoursework.map((group) => (
                    <div key={group.title} className="course-group">
                      <h4>{group.title}</h4>
                      <ul className="course-list">
                        {group.courses.map((course) => (
                          <li key={course}>{course}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </AnimatedDetails>
              </SpotSurface>
            </div>
            <SectionTrace kind="wave" />
          </section>
        </Reveal>

        <Reveal>
          <section id="skills" className="section">
            <div className="section-heading">
              <h2>Skills</h2>
            </div>
            <div className="skill-grid">
              {skillGroups.map((group, groupIndex) => (
                <div
                  key={group.title}
                  className="skill-slot"
                  style={{ ["--i" as string]: groupIndex }}
                >
                <SpotSurface className="skill-group">
                  <h3>{group.title}</h3>
                  <ul className="chips">
                    {group.courses.map((item, chipIndex) => (
                      <li
                        key={item}
                        className="chip"
                        style={{ ["--i" as string]: chipIndex }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </SpotSurface>
                </div>
              ))}
            </div>
            <SectionTrace kind="nodes" />
          </section>
        </Reveal>

        <Reveal>
          <section id="about" className="section">
            <div className="section-heading">
              <h2>About</h2>
            </div>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="prose">
                {paragraph}
              </p>
            ))}
            <div id="contact" className="contact">
              <h3>Contact</h3>
              <ul className="icon-row">
                <li style={{ ["--i" as string]: 0 }}>
                  <Magnetic>
                    <a
                      className="icon-link"
                      href={`mailto:${profile.email}`}
                      data-label="Email"
                    >
                      <MailIcon />
                      <span className="visually-hidden">Email {profile.email}</span>
                    </a>
                  </Magnetic>
                </li>
                <li style={{ ["--i" as string]: 1 }}>
                  <Magnetic>
                    <a
                      className="icon-link"
                      href={profile.cvView}
                      target="_blank"
                      rel="noreferrer"
                      data-label="CV"
                    >
                      <CvIcon />
                      <span className="visually-hidden">CV (opens in a new tab)</span>
                    </a>
                  </Magnetic>
                </li>
                <li style={{ ["--i" as string]: 2 }}>
                  <Magnetic>
                    <a className="icon-link" href={profile.phoneHref} data-label="Phone">
                      <PhoneIcon />
                      <span className="visually-hidden">Phone {profile.phone}</span>
                    </a>
                  </Magnetic>
                </li>
                {socialLinks.map((link, index) => (
                  <li key={link.href} style={{ ["--i" as string]: index + 3 }}>
                    <Magnetic>
                      <ExternalLink href={link.href} className="icon-link" label={link.label}>
                        <BrandIcon href={link.href} />
                      </ExternalLink>
                    </Magnetic>
                  </li>
                ))}
              </ul>
            </div>
            <SectionTrace kind="arc" />
          </section>
        </Reveal>
      </div>
    </main>
    </RouteFrame>
  );
}
