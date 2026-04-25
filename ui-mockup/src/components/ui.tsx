import React from 'react';

export const Button = ({ children, onClick, className = "", variant = "primary" }: { children: React.ReactNode, onClick?: () => void, className?: string, variant?: "primary" | "secondary" }) => {
  const baseStyle = "font-bold text-sm px-6 py-3 border-2 border-black rounded transition-all hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none shadow-[4px_4px_0_0_#000]";
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 shadow-[4px_4px_0_0_#EAEAEA] hover:shadow-none hover:translate-x-[0px] hover:translate-y-[0px] active:scale-95",
    secondary: "bg-white text-black",
  };
  
  // Custom fix for primary hover state based on Neo-brutalism
  const btnStyle = variant === 'primary' 
    ? "font-bold text-sm px-6 py-3 border-2 border-black rounded bg-white text-black transition-all shadow-[4px_4px_0_0_#000] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none"
    : "font-semibold text-sm px-4 py-2 border-2 border-black rounded bg-gray-100 text-black transition-all hover:bg-gray-200";

  return (
    <button onClick={onClick} className={`${btnStyle} ${className}`}>
      {children}
    </button>
  );
}

export const Tag: React.FC<{ children: React.ReactNode, color?: "gray" | "pink" | "green" | "purple" }> = ({ children, color = "gray" }) => {
  const colors = {
    gray: "bg-gray-200 text-gray-800",
    pink: "bg-pink-100 text-pink-800",
    green: "bg-green-100 text-green-800",
    purple: "bg-purple-100 text-purple-800",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded ${colors[color]}`}>
      {children}
    </span>
  );
}

export const Container = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`w-full max-w-7xl mx-auto px-6 sm:px-12 xl:px-8 ${className}`}>
      {children}
    </div>
  );
}

export const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title?: string, children: React.ReactNode }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="bg-white border-4 border-black w-full max-w-4xl max-h-[90vh] flex flex-col shadow-[8px_8px_0_0_#000] relative overflow-hidden rounded-xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b-4 border-black bg-[#fdfaf5]">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h2>
          <button 
            onClick={onClose} 
            className="p-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="p-6 md:p-10 overflow-y-auto bg-white">
           {children}
        </div>
      </div>
    </div>
  );
}
