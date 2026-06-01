import React from 'react';
import { Briefcase, Trophy, Code, Linkedin, Globe } from 'lucide-react';

export function PresentationSlide() {
  return (
    <div className="w-[1280px] h-[720px] bg-[#fdfaf5] flex flex-col p-12 relative overflow-hidden font-sans border-4 border-black shadow-[8px_8px_0_0_#000]">
      {/* Top Header */}
      <div className="flex justify-between items-center w-full mb-8">
        <h1 className="text-4xl font-bold text-[#e84f35]">About Myself</h1>
        {/* SPX Express logo approximation */}
        <div className="flex items-center gap-1 text-[#e84f35]">
          <div className="flex gap-[2px] skew-x-[-15deg]">
            <div className="w-2 h-4 bg-[#e84f35]"></div>
            <div className="w-2 h-4 bg-[#e84f35]"></div>
            <div className="w-2 h-4 bg-[#e84f35]"></div>
          </div>
          <div className="font-black italic text-3xl tracking-tighter ml-1 flex items-baseline">
            SPX
            <span className="text-xs font-bold tracking-widest uppercase ml-1 not-italic relative -top-1">Express</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 gap-12">
        {/* Left Column - Avatar & Badge */}
        <div className="w-[400px] flex flex-col items-center">
          <div className="relative w-[320px] h-[400px]">
            {/* Shadow border */}
            <div className="absolute inset-0 bg-black rounded-3xl transform translate-x-2 translate-y-2"></div>
            {/* Image Container */}
            <div className="absolute inset-0 bg-white border-4 border-black rounded-3xl overflow-hidden">
              <img src="/avatar2.png" alt="An Nguyen" className="w-full h-full object-cover object-top" />
            </div>
          </div>
          
          {/* Latest Build Badge */}
          <div className="mt-8 border-[3px] border-black rounded-lg px-4 py-3 flex items-center gap-3 bg-white font-bold text-xs uppercase shadow-[4px_4px_0_0_#000] w-[360px] justify-center">
            <div className="w-3 h-3 bg-green-500 rounded-full border-[2px] border-black flex-shrink-0 animate-pulse"></div>
            <span className="tracking-wide">LATEST BUILD: AI-POWERED VIETNAMESE TECH NEWS PLATFORM</span>
          </div>
        </div>

        {/* Right Column - Info */}
        <div className="flex-1 flex flex-col pt-2">
          
          {/* Title Badge */}
          <div className="self-start border-[3px] border-black px-5 py-2 font-black text-sm tracking-widest shadow-[4px_4px_0_0_#000] mb-8 bg-white uppercase flex items-center gap-2">
            <span>AN NGUYEN</span>
            <span className="w-1.5 h-1.5 bg-black rounded-full mx-1"></span>
            <span className="text-gray-600">PRODUCT BUILDER / CONTENT CREATOR</span>
          </div>

          <h2 className="text-[#e84f35] text-[48px] font-bold leading-[1.1] mb-4">
            Building the "How."<br/>
            Obsessing over the "Why."
          </h2>
          <p className="text-[20px] font-medium text-gray-800 mb-8 max-w-[600px] leading-relaxed">
            Most engineers only care about how a system works. I am obsessed with why it matters to the user.
          </p>

          {/* Added Information Section */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-6 mt-auto">
            {/* Experience */}
            <div>
              <h3 className="font-bold text-gray-500 uppercase text-xs tracking-widest mb-3 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-black"/> Experience
              </h3>
              <ul className="space-y-2 font-bold text-sm text-black">
                <li className="flex items-start gap-2">
                  <span className="text-[#e84f35]">•</span>
                  <span>Back-end & Platform Engineer <br/><span className="text-gray-600 font-medium text-xs">HCLTech x ANZx</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#e84f35]">•</span>
                  <span>IT Intern Co-op / Management <br/><span className="text-gray-600 font-medium text-xs">Procter & Gamble Vietnam</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#e84f35]">•</span>
                  <span>Marketing Intern <br/><span className="text-gray-600 font-medium text-xs">VAS</span></span>
                </li>
              </ul>
            </div>
            
            {/* Awards */}
            <div>
              <h3 className="font-bold text-gray-500 uppercase text-xs tracking-widest mb-3 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500"/> Giải (Awards)
              </h3>
              <ul className="space-y-2 font-bold text-sm text-black">
                <li className="flex items-start gap-2">
                  <span className="text-[#e84f35]">•</span>
                  <span>National Champion <br/><span className="text-gray-600 font-medium text-xs">Microsoft APAC AI Hackathon</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#e84f35]">•</span>
                  <span>Regional Champion <br/><span className="text-gray-600 font-medium text-xs">Accessibility Design APAC</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#e84f35]">•</span>
                  <span>National Champion <br/><span className="text-gray-600 font-medium text-xs">RMIT Business Analytics</span></span>
                </li>
              </ul>
            </div>

            {/* Skills */}
            <div className="col-span-2">
              <h3 className="font-bold text-gray-500 uppercase text-xs tracking-widest mb-3 flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-500"/> Core Skills
              </h3>
              <div className="flex flex-wrap gap-2 text-sm font-bold">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md border-2 border-purple-300">Product Lifecycle</span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md border-2 border-purple-300">Strategy</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md border-2 border-green-300">Data Analytics</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md border-2 border-blue-300">Go / Python / Node</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md border-2 border-blue-300">GCP / AWS / K8s</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#e84f35] border-t-4 border-black flex items-center justify-between px-12 text-white font-bold">
        <div className="flex items-center gap-6 text-sm uppercase tracking-widest">
          <span className="flex items-center gap-2"><Globe className="w-4 h-4"/> annguyen.work</span>
          <span className="flex items-center gap-2"><Linkedin className="w-4 h-4"/> /in/an-nguyen-quoc</span>
        </div>
        <div className="text-sm uppercase tracking-widest flex items-center gap-2">
          <span>Find out more</span>
          <span className="w-6 h-6 bg-white text-[#e84f35] rounded-full flex items-center justify-center border-2 border-black">→</span>
        </div>
      </div>

    </div>
  );
}
