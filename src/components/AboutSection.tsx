import React from 'react';
import { Container } from './ui';
import { Briefcase, Code, Compass, Filter, GraduationCap, Server, Linkedin } from 'lucide-react';
import { PixelComputer } from './PixelIcons';
import { PortfolioFocus, portfolioFocusOptions } from './portfolioFocus';

const focusLabel = (focus: PortfolioFocus) => portfolioFocusOptions.find(option => option.id === focus)!.label;

const FocusTags = ({ focuses }: { focuses: PortfolioFocus[] }) => (
  <div className="flex flex-wrap gap-1.5 mb-3">
    {focuses.map(focus => (
      <span key={focus} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-purple-100 text-purple-800">
        {focusLabel(focus)}
      </span>
    ))}
  </div>
);

export function AboutSection({
  activeFocus,
  onFocusChange,
}: {
  activeFocus: PortfolioFocus;
  onFocusChange: (focus: PortfolioFocus) => void;
}) {
  const hasExtracurricular = ['product', 'business'].includes(activeFocus);

  return (
    <section className="py-24 bg-[#fdfaf5]" id="experience">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column: Intro & Skills */}
          <div className="w-full lg:w-5/12 flex flex-col gap-8 lg:sticky lg:top-32 self-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
                <PixelComputer className="w-8 h-8" />
                About Me
              </h2>
              <p className="text-lg md:text-xl text-brand-text leading-relaxed font-medium mb-4">
                I am a Software Engineer pivoting to Product Management to focus entirely on the user experience. After two years of engineering scalable infrastructure, I realized that bridging technical complexity with customer needs is where I create the most value.
              </p>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                Driven by a relentless focus on the product, I go beyond theory. I build real, working technical products and develop award-winning commercial strategies that solve critical customer pain points.
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                I deliver high-impact solutions to enterprise stakeholders by translating raw data into clear requirements, aligning engineering and business teams, and driving measurable product growth.
              </p>
            </div>

            <div className="pt-6 border-t-2 border-brand-border">
              <h3 className="text-xl font-bold mb-6">Core Competencies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  <div className="w-10 h-10 bg-purple-100 rounded flex items-center justify-center mb-3 border-2 border-black">
                    <Compass className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="font-bold mb-2">Product & Strategy</h4>
                  <p className="text-sm text-gray-600 font-medium">Product Lifecycle Management, MVP Definition, UI/UX Prototyping, Strategy & Alignment.</p>
                </div>
                
                <div className="bg-white p-5 border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center mb-3 border-2 border-black">
                    <Code className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="font-bold mb-2">Data & Analytics</h4>
                  <p className="text-sm text-gray-600 font-medium">Data-Driven Decision Making, KPI Tracking, FinOps Cost Optimization, BigQuery, Looker.</p>
                </div>

                <div className="bg-white p-5 border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all md:col-span-2">
                  <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center mb-3 border-2 border-black">
                    <Server className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-bold mb-2">Technical Engineering</h4>
                  <p className="text-sm text-gray-600 font-medium">Go, Python, NodeJS, Java, AWS, GCP, Docker, Kubernetes, SQL.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Timeline */}
          <div className="w-full lg:w-7/12 flex flex-col gap-10">
            <div className="bg-white border-2 border-black rounded-xl p-5 md:p-6 shadow-[4px_4px_0_0_#000]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-subtext mb-3">
                <Filter className="w-4 h-4 text-black" />
                Relevant experience route
              </div>
              <p className="text-sm text-brand-subtext leading-relaxed mb-4">
                Choose the perspective most relevant to your review.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {portfolioFocusOptions.map(option => {
                  const isActive = option.id === activeFocus;
                  return (
                    <button
                      type="button"
                      key={option.id}
                      onClick={() => onFocusChange(option.id)}
                      aria-pressed={isActive}
                      className={`text-left p-4 border-2 rounded-xl transition-all ${
                        isActive
                          ? 'bg-purple-100 border-black shadow-[3px_3px_0_0_#000]'
                          : 'bg-white border-brand-border hover:border-black hover:shadow-[3px_3px_0_0_#000]'
                      }`}
                    >
                      <span className="block font-bold">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Work Experience */}
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Briefcase className="w-6 h-6" /> {focusLabel(activeFocus)} Experience
              </h3>
              <div className="relative border-l-4 border-black pl-8 ml-4 space-y-8">
                {['product', 'engineering'].includes(activeFocus) && <div className="relative">
                  <div className="absolute w-5 h-5 bg-black rounded-full -left-[42px] top-1 border-4 border-[#fdfaf5]"></div>
                  <div className="bg-white p-6 border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000]">
                    <div className="flex items-center gap-2 text-brand-subtext font-bold text-xs uppercase tracking-wide mb-2">
                      May 2024 - Present
                    </div>
                    <h4 className="text-xl font-bold text-black mb-1">Back-end & Platform Engineer</h4>
                    <p className="text-brand-subtext font-bold mb-3">HCLTech x ANZx (ANZ Plus)</p>
                    <FocusTags focuses={['product', 'engineering']} />
                    <p className="text-sm text-gray-700 leading-relaxed md:line-clamp-4">
                      Led the end-to-end lifecycle of a Multi-Agent Analytics Chatbot automating SQL generation and chart visualization. Delivered secure Joint-Account workflows and optimized Google Cloud usage, eliminating manual financial data processing.
                    </p>
                  </div>
                </div>}

                {['product', 'business'].includes(activeFocus) && <div className="relative">
                  <div className="absolute w-5 h-5 bg-white border-4 border-black rounded-full -left-[42px] top-1"></div>
                  <div className="bg-white p-6 border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000]">
                    <div className="flex items-center gap-2 text-brand-subtext font-bold text-xs uppercase tracking-wide mb-2">
                      Sep 2023 - Dec 2023
                    </div>
                    <h4 className="text-xl font-bold text-black mb-1">IT Intern Co-op / Management</h4>
                    <p className="text-brand-subtext font-bold mb-3">Procter & Gamble Vietnam</p>
                    <FocusTags focuses={['product', 'business']} />
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Led global SU/Pallet tracking initiative for Grooming BU, aligning up to 20 cross-functional stakeholders.
                    </p>
                  </div>
                </div>}

                {activeFocus === 'business' && <div className="relative">
                  <div className="absolute w-5 h-5 bg-white border-4 border-black rounded-full -left-[42px] top-1"></div>
                  <div className="bg-white p-6 border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000]">
                    <div className="flex items-center gap-2 text-brand-subtext font-bold text-xs uppercase tracking-wide mb-2">
                      Oct 2021 - Nov 2022
                    </div>
                    <h4 className="text-xl font-bold text-black mb-1">Marketing Intern</h4>
                    <p className="text-brand-subtext font-bold mb-3">Vietnam Australia International School</p>
                    <FocusTags focuses={['business']} />
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Managed marketing copywriting and content production. Founded and grew social communities to 30,000+ followers, assisting the PR Manager in media creation and event organization to promote School's values.
                    </p>
                  </div>
                </div>}
              </div>
            </div>

            {/* Extracurricular */}
            {hasExtracurricular && <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Compass className="w-6 h-6" /> Extracurricular
              </h3>
              <div className="relative border-l-4 border-black pl-8 ml-4 space-y-8">
                <div className="relative">
                  <div className="absolute w-5 h-5 bg-white border-4 border-black rounded-full -left-[42px] top-1"></div>
                  <div className="bg-white p-6 border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000]">
                    <div className="flex items-center gap-2 text-brand-subtext font-bold text-xs uppercase tracking-wide mb-2">
                      Jul 2022 - Jan 2023
                    </div>
                    <h4 className="text-xl font-bold text-black mb-1">Project Leader</h4>
                    <p className="text-brand-subtext font-bold mb-3">Intelligent Investment Competition</p>
                    <FocusTags focuses={['product', 'business']} />
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Directed a 6-month action plan for a nationwide virtual stock trading competition with 600+ participants. Managed 4 cross-functional teams (38 members) spanning Marketing, Sponsorship, and Programming. Secured complex stakeholder partnerships and major funding.
                    </p>
                  </div>
                </div>

                {activeFocus === 'business' && <div className="relative">
                  <div className="absolute w-5 h-5 bg-white border-4 border-black rounded-full -left-[42px] top-1"></div>
                  <div className="bg-white p-6 border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000]">
                    <div className="flex items-center gap-2 text-brand-subtext font-bold text-xs uppercase tracking-wide mb-2">
                      Jun 2022 - May 2023
                    </div>
                    <h4 className="text-xl font-bold text-black mb-1">External Vice President</h4>
                    <p className="text-brand-subtext font-bold mb-3">RMIT Vietnam Finance Club</p>
                    <FocusTags focuses={['business']} />
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Operated as an Executive Board member, managing 140+ members across 4 departments. Efficiently supervised External Relations and Marketing teams, growing social communities to 29k+ followers and driving successful medium-scale events through cross-club collaborations.
                    </p>
                  </div>
                </div>}
              </div>
            </div>}

            {/* Education */}
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="w-6 h-6" /> Education
              </h3>
              <div className="relative border-l-4 border-black pl-8 ml-4 space-y-8">
                <div className="relative">
                  <div className="absolute w-5 h-5 bg-white border-4 border-black rounded-full -left-[42px] top-1"></div>
                  <div className="bg-blue-50 p-6 border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000]">
                    <div className="flex items-center gap-2 text-brand-subtext font-bold text-xs uppercase tracking-wide mb-2">
                      Graduation
                    </div>
                    <h4 className="text-xl font-bold text-black mb-1">Bachelor of Info Technology</h4>
                    <p className="text-brand-subtext font-bold mb-3">RMIT University (GPA: 3.6/4.0)</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Scholar's List.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mx-auto lg:mx-0 mt-6 lg:mt-4">
               <a 
                 href="https://www.linkedin.com/in/an-nguyen-quoc/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 rounded-lg font-bold text-lg border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
               >
                 <Linkedin className="w-5 h-5 fill-current" />
                 Connect
               </a>
               <a 
                 href="https://www.linkedin.com/in/an-nguyen-quoc/details/experience/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-50 rounded-lg font-bold text-lg border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
               >
                 View Full Experience
               </a>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
