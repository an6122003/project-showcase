import React from 'react';
import { Container } from './ui';
import { Code, Compass, FileText } from 'lucide-react';

const principles = [
  {
    category: "The Engineering Perspective",
    title: "Product-Minded Engineering",
    body: "Code should not exist in a vacuum. I build with the business goals and the user journey in mind. This means making technical trade-offs that favor long-term scalability without sacrificing immediate product momentum.",
    icon: Code,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    category: "The Product Perspective",
    title: "The \"Why\" Before the \"How\"",
    body: "Every feature should solve a actual problem. I focus on ruthlessly prioritizing the MVP to find product-market fit early. If we cannot measure the impact of a feature, we probably should not be building it yet.",
    icon: Compass,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    category: "The Execution Perspective",
    title: "Radical Clarity",
    body: "Ambiguity is the biggest bottleneck for any team. Whether I am writing a PRD or a technical spec, my goal is to ensure every stakeholder and engineer knows exactly what we are building and why it matters.",
    icon: FileText,
    iconBg: "bg-green-100",
    iconColor: "text-green-600"
  }
];

export function TestimonialSection() {
  return (
    <section className="py-24 bg-[#fdfaf5] border-y-2 border-brand-border" id="principles">
      <Container>
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Operating Principles</h2>
          <p className="text-brand-subtext max-w-3xl text-lg leading-relaxed">
            I believe great products aren't just about clean code or smart features. They are about how you bridge the gap between the two. These are the core rules I follow when I am building and leading.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((p, idx) => (
            <div
              key={idx}
              className="bg-white p-8 border-2 border-black rounded-xl shadow-[6px_6px_0_0_#000] flex flex-col transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-lg border-2 border-black ${p.iconBg} shadow-[2px_2px_0_0_#000]`}>
                  <p.icon className={`w-6 h-6 ${p.iconColor}`} strokeWidth={2.5} />
                </div>
                <div className="text-sm font-bold text-brand-subtext uppercase tracking-wider">{p.category}</div>
              </div>

              <h3 className="text-2xl font-bold mb-4">{p.title}</h3>
              <p className="text-lg text-brand-text leading-relaxed font-medium flex-1">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
