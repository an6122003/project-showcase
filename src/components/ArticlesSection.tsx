import React from 'react';
import { Container } from './ui';
import { BookOpen, ExternalLink, ArrowRight } from 'lucide-react';

const articles = [
  {
    title: "From Software Engineer to Product Manager",
    excerpt: "A deep dive into my transition journey, how technical background helps in product strategy, and the challenges of shifting mindset from 'how to build' to 'what to build'.",
    date: "Dec 2023",
    readTime: "5 min read",
    url: "#"
  },
  {
    title: "Optimizing FinOps in Google Cloud",
    excerpt: "How we eliminated manual financial data processing and optimized our cloud usage, saving significant operational costs while improving security.",
    date: "Feb 2024",
    readTime: "8 min read",
    url: "#"
  }
];

export function ArticlesSection() {
  // Toggle this to true when you have real articles to publish
  const SHOW_ARTICLES = false;

  if (!SHOW_ARTICLES) {
    return null;
  }

  return (
    <section className="py-24 bg-white" id="articles">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-4">
              <BookOpen className="w-10 h-10 text-black" />
              Thinking in Product.
            </h2>
            <p className="text-brand-subtext max-w-2xl text-lg">Building is only half the work. I use this space to document the logic behind my technical decisions and the product strategies that drive them. It is a collection of notes on software architecture, user experience, and the lessons I learn while shipping products.</p>
          </div>
          <a href="#" className="flex items-center gap-2 font-bold hover:underline">
            View all articles <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, idx) => (
            <a 
              key={idx}
              href={article.url}
              className="group block bg-[#fdfaf5] p-8 border-2 border-black rounded-xl shadow-[6px_6px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-brand-subtext">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:underline">{article.title}</h3>
              <p className="text-brand-text leading-relaxed font-medium">
                {article.excerpt}
              </p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
