import React from 'react';
import { Container } from './ui';
import { Trophy, Medal, Award, Star } from 'lucide-react';

const awards = [
  {
    title: "National Champion",
    competition: "Microsoft APAC AI For Accessibility Hackathon 2023 (Vietnam)",
    icon: Trophy,
    color: "bg-yellow-100 text-yellow-600 border-yellow-400",
    hoverDecoration: "group-hover:decoration-yellow-400"
  },
  {
    title: "Regional Champion",
    competition: "Accessibility Design Competition 2023 (APAC)",
    icon: Medal,
    color: "bg-orange-100 text-orange-600 border-orange-400",
    hoverDecoration: "group-hover:decoration-orange-400"
  },
  {
    title: "National Champion",
    competition: "RMIT Business Analytics Competition",
    icon: Award,
    color: "bg-blue-100 text-blue-600 border-blue-400",
    targetId: "rbac-system-design",
    hoverDecoration: "group-hover:decoration-blue-400"
  },
  {
    title: "Top 30 National",
    competition: "Unilever Future Leader League",
    icon: Star,
    color: "bg-purple-100 text-purple-600 border-purple-400",
    targetId: "ufll2023",
    hoverDecoration: "group-hover:decoration-purple-400"
  }
];

export function AwardsSection() {
  return (
    <section className="py-24 bg-brand-bg border-y-2 border-brand-border" id="awards">
      <Container>
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-4">
            <Trophy className="w-10 h-10 text-yellow-500" />
            Awards & Honors
          </h2>
          <p className="text-brand-subtext max-w-2xl text-lg">Recognitions from regional and national competitions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {awards.map((award, index) => {
            const hasLink = !!award.targetId;
            const CardWrapper = hasLink ? 'a' : 'div';
            
            return (
              <CardWrapper 
                key={index}
                href={hasLink ? `#${award.targetId}` : undefined}
                className={`bg-white p-6 ${hasLink ? 'pb-12' : ''} border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:shadow-[8px_8px_0_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all flex items-start gap-4 relative group block ${hasLink ? 'cursor-pointer' : ''}`}
              >
                <div className={`p-4 border-2 border-black rounded-lg shadow-[2px_2px_0_0_#000] ${award.color} flex-shrink-0`}>
                  <award.icon className="w-8 h-8" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col justify-center h-full">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-black transition-colors">{award.title}</h3>
                  <p className="text-brand-subtext font-medium">{award.competition}</p>
                </div>
                
                {hasLink && (
                  <span className={`absolute bottom-4 right-6 font-bold text-sm text-black underline underline-offset-4 decoration-2 decoration-transparent ${award.hoverDecoration} transition-colors`}>
                    View Case Study →
                  </span>
                )}
              </CardWrapper>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
