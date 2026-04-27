import React from 'react';
import { Container } from './ui';

const techSkills = [
  "AWS", "GCP", "Python", "Go", "NodeJS", "React", "Docker", "Kubernetes", "SQL", "BigQuery"
];

const pmSkills = [
  "Product Strategy", "Roadmap Planning", "UX Research", "Agile", "Jira", "Figma", "Looker", "A/B Testing", "Stakeholder Alignment"
];

// Combine and duplicate for infinite marquee effect
const allSkills = [...techSkills, ...pmSkills];
const duplicatedSkills = [...allSkills, ...allSkills, ...allSkills]; // triple to ensure it's wide enough

export function TechStackSection() {
  return (
    <section className="py-12 bg-brand-bg border-y-2 border-brand-border overflow-hidden" id="tech-stack">
      <div className="relative flex whitespace-nowrap">
        <div className="flex animate-marquee gap-4 items-center">
          {duplicatedSkills.map((skill, index) => (
            <div 
              key={index}
              className="px-6 py-3 bg-white text-black font-bold text-lg md:text-xl border-2 border-black rounded-lg shadow-[4px_4px_0_0_#666] select-none"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
