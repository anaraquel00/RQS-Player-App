import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const MobileFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { colors } = useTheme();

  return (
    <div 
      className="flex items-center justify-center min-h-screen p-4 sm:p-8"
      style={{ backgroundColor: '#000' }} // Pure black surround
    >
      {/* Device Frame */}
      <div 
        className="relative w-full max-w-[400px] h-[800px] rounded-[3rem] border-[10px] border-gray-900 shadow-2xl overflow-hidden flex flex-col"
        style={{ 
          backgroundColor: colors.background,
          borderColor: '#1a1a1a',
        }}
      >
        {/* Notch / Dynamic Island simulation */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50 flex items-center justify-center">
           <div className="w-1 h-1 bg-gray-800 rounded-full mr-1" />
           <div className="w-12 h-1 bg-gray-900 rounded-full" />
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col relative pt-8 pb-4 px-0 box-border">
          {children}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/20 rounded-full" />
      </div>
    </div>
  );
};
