'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ParticleBackground } from '@/components/ui/ParticleBackground';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

import { navigationData } from '@/data/navigation';
import { aboutData } from '@/data/about';
import { researchData } from '@/data/research';
import { contactData } from '@/data/contact';

import {
  getActiveRole,
  getAdaptedHero,
  getAdaptedProjects,
  getAdaptedSkills,
  getAdaptedExperience,
} from '@/lib/roles';

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      title="Copy email address"
      className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-cyan-400 border border-white/10 hover:border-cyan-500/30 bg-white/5 hover:bg-cyan-950/20 px-2.5 py-1 rounded-md transition-all duration-200"
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-emerald-400">Copied!</span>
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

function PortfolioContent() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('role');
  const activeRole = getActiveRole(roleParam);

  // Adapt content dynamically
  const hero = getAdaptedHero(activeRole);
  const projects = getAdaptedProjects(activeRole);
  const skills = getAdaptedSkills(activeRole);
  const experience = getAdaptedExperience(activeRole);

  return (
    <div className="bg-[#030712] text-zinc-100 min-h-screen font-sans selection:bg-[#06b6d4]/30 selection:text-[#06b6d4]">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#030712]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-4">
          <Link href="#hero" className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse" />
            Sreelekha Vuppala
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navigationData.map((item) => (
              <a
                key={item.sectionId}
                href={item.href}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden py-20 px-6 border-b border-white/5">
        <ParticleBackground particleCount={50} className="opacity-40" />
        
        <div className="max-w-4xl mx-auto text-center md:text-left relative z-10 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400">{hero.name}</span>
          </h1>

          <div className="text-lg md:text-2xl font-mono text-cyan-400/90 font-medium">
            <TypewriterText strings={hero.roles} className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300" />
          </div>

          <p className="max-w-2xl text-base md:text-lg text-zinc-400 leading-relaxed">
            {hero.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
            <Button variant="primary" href={hero.ctaButtons.viewWork.href}>
              {hero.ctaButtons.viewWork.label}
            </Button>
            <Button variant="secondary" href={`/${hero.ctaButtons.resume.filename}`} download={hero.ctaButtons.resume.filename}>
              {hero.ctaButtons.resume.label}
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 border-b border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold text-white tracking-tight">About Me</h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed text-base">
              {aboutData.bio.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="border border-white/10 bg-white/5 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
              <span className="font-mono text-xs text-cyan-400 border border-cyan-500/20 bg-cyan-950/20 px-2 py-1 rounded">
                CURRENT WORK
              </span>
              <span className="text-sm text-zinc-300">{aboutData.currentlyWorkingOn}</span>
            </div>

            {aboutData.personalInterests && (
              <div className="space-y-3 pt-2">
                <h3 className="text-base font-semibold text-white tracking-wide">🌱 Personal Growth & Interests</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-zinc-400">
                  {aboutData.personalInterests.map((interest, idx) => (
                    <li
                      key={idx}
                      className="bg-white/[0.03] border border-white/5 p-3 rounded-lg flex items-start gap-2.5 hover:bg-white/5 hover:border-white/10 transition-all duration-200"
                    >
                      <span>{interest}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Quick Metrics */}
          <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-8 flex flex-col justify-center space-y-8">
            {aboutData.stats.map((stat, idx) => (
              <div key={idx} className="text-center md:text-left">
                <div className="text-4xl font-extrabold text-white tracking-tight flex items-center justify-center md:justify-start gap-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-medium text-zinc-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 border-b border-white/5 bg-zinc-950/20">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl font-bold text-white tracking-tight text-center md:text-left">Work Experience</h2>

          <div className="relative border-l border-white/10 pl-6 md:pl-8 ml-4 space-y-12">
            {experience.entries.map((entry, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node */}
                <span
                  className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-[#030712] transition-colors duration-200"
                  style={{ backgroundColor: entry.accentColor || '#06b6d4' }}
                />
                
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-xl font-bold text-white">{entry.role}</h3>
                      <p className="text-base font-semibold text-cyan-400">{entry.company}</p>
                    </div>
                    <span className="text-sm font-mono text-zinc-500 bg-white/5 border border-white/10 px-3 py-1 rounded-full self-start md:self-auto">
                      {entry.dateRange}
                    </span>
                  </div>

                  <ul className="list-disc list-outside ml-5 space-y-2.5 text-zinc-400 text-sm leading-relaxed">
                    {entry.achievements.map((bullet, bIdx) => (
                      <li key={bIdx} className="hover:text-zinc-200 transition-colors">
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {entry.technologies.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 border-b border-white/5">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl font-bold text-white tracking-tight text-center md:text-left">Core Skills</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.categories.map((cat, idx) => (
              <Card key={idx} className="space-y-4">
                <div className="flex items-center gap-2.5 border-b border-white/5 pb-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <h3 className="font-bold text-lg text-white" style={{ color: cat.accentColor }}>
                    {cat.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <Badge key={skill.name} variant={cat.roles?.includes(activeRole || '') ? 'accent' : 'default'}>
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 border-b border-white/5 bg-zinc-950/20">
        <div className="max-w-5xl mx-auto space-y-12">
          <h2 className="text-3xl font-bold text-white tracking-tight text-center">Featured Work</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.projects.map((proj) => (
              <Card key={proj.id} className="flex flex-col justify-between h-full space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-white leading-snug">{proj.title}</h3>
                    {proj.featured && (
                      <span className="text-[10px] font-mono font-semibold tracking-wider text-cyan-400 bg-cyan-950/20 border border-cyan-500/20 px-2 py-0.5 rounded uppercase whitespace-nowrap">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-400 line-clamp-3">{proj.description}</p>
                  <p className="text-xs font-mono text-zinc-500 bg-white/5 p-3 rounded-lg border border-white/5">
                    {proj.technicalSummary}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-1">
                    {proj.technologies.slice(0, 5).map((tech) => (
                      <span key={tech} className="text-[10px] font-mono text-zinc-500 bg-white/5 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                    {proj.technologies.length > 5 && (
                      <span className="text-[10px] font-mono text-cyan-400/70 px-2 py-0.5">
                        +{proj.technologies.length - 5} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    {proj.links.github && (
                      <a
                        href={proj.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono font-semibold text-cyan-400 hover:underline"
                      >
                        GitHub Code &rarr;
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-24 px-6 border-b border-white/5">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl font-bold text-white tracking-tight text-center md:text-left">Research & Technical Interests</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Focus Areas</h3>
              <div className="flex flex-wrap gap-2">
                {researchData.interests.map((interest) => (
                  <Badge key={interest} variant="accent">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Currently Reading</h3>
              <ul className="space-y-3 font-mono text-xs text-zinc-400">
                {researchData.currentlyReading.map((book, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-bold">0{idx + 1}.</span>
                    <span>{book}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-28 px-6 bg-zinc-950/40">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-3">
            <h2 className="text-4xl font-extrabold text-white tracking-tight">Let&apos;s Connect</h2>
            <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              {contactData.invitationText}
            </p>
          </div>

          {/* Email card */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Reach me at</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span className="font-mono text-lg md:text-xl text-cyan-400 tracking-tight select-all">
                {contactData.email}
              </span>
              <CopyEmailButton email={contactData.email} />
            </div>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contactData.email}&su=Hello%20from%20your%20portfolio`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 text-sm font-medium text-white bg-[#0d1b35] border border-cyan-500/40 hover:bg-[#0f2145] hover:shadow-[0_0_16px_4px_rgba(6,182,212,0.25)] transition-all duration-200 rounded-lg px-6 py-2.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send via Gmail
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-6">
            <a
              href={contactData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <span className="text-zinc-700">|</span>
            <a
              href={contactData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              GitHub
            </a>
          </div>

          <div className="text-xs text-zinc-600 font-mono">
            &copy; {new Date().getFullYear()} Sreelekha Vuppala. All rights reserved.
          </div>
        </div>
      </section>

    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="bg-[#030712] text-zinc-100 min-h-screen flex items-center justify-center font-mono text-sm">
        Loading Portfolio...
      </div>
    }>
      <PortfolioContent />
    </Suspense>
  );
}
