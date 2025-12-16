"use client";
import React, { useState } from 'react';
import { COLORS } from '../constants.tsx';
import { ArrowRight, ArrowDown, Sparkles } from 'lucide-react';

const ColorPalette = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="palette" className="py-20 md:py-32 bg-charcoal text-white relative overflow-hidden">
      <div className="container mx-auto px-6 mb-10 md:mb-16 relative z-10">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <h2 className="font-serif text-5xl md:text-7xl text-white leading-none">
                Palette <span className="block text-rose-accent text-4xl md:text-5xl mt-2 italic font-light">of Nature</span>
            </h2>
            <p className="text-white/60 max-w-xs md:text-right mt-6 md:mt-0 font-light text-sm md:text-base">
                Chạm vào từng ô màu để khám phá vẻ đẹp của tự nhiên.
            </p>
        </div>
      </div>

      {/* Responsive Layout: Adjusted Flex Ratios for better balance */}
      <div className="container mx-auto px-6 h-[600px] md:h-[600px] flex flex-col md:flex-row gap-3 md:gap-4 transition-all">
          {COLORS.map((color, index) => {
              const isActive = activeIndex === index;
              return (
                <div 
                    key={color.id}
                    onClick={() => setActiveIndex(isActive ? null : index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    className={`relative rounded-[2rem] md:rounded-[3rem] cursor-pointer overflow-hidden transition-all duration-500 ease-out
                        ${isActive 
                            ? 'flex-[2.5] md:flex-[4] shadow-2xl ring-2 ring-white/10' 
                            : 'flex-[1] opacity-90 grayscale-[0.2] hover:grayscale-0' 
                        }
                    `}
                    style={{ backgroundColor: color.hex }}
                >
                    {/* Content for Active State */}
                    <div className={`absolute inset-0 flex flex-col justify-between p-6 md:p-12 transition-all duration-500 ${isActive ? 'opacity-100 delay-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                        <div className="flex justify-between items-start">
                            <span className="text-charcoal/40 text-lg md:text-xl font-bold font-mono">0{index + 1}</span>
                            <div className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                                <ArrowRight className="text-charcoal hidden md:block -rotate-45" size={20} />
                                <ArrowDown className="text-charcoal md:hidden" size={20} />
                            </div>
                        </div>
                        
                        <div>
                             <div className="flex items-center gap-2 mb-3 opacity-60">
                                <Sparkles size={14} className="text-charcoal" />
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-charcoal">Trending 2025</span>
                             </div>
                             <h3 className="font-serif text-3xl md:text-5xl text-charcoal mb-4 font-bold tracking-tight leading-none whitespace-nowrap">
                                {color.name}
                             </h3>
                             <div className="inline-flex items-center gap-2 text-charcoal font-medium border-b border-charcoal/30 pb-1 hover:border-charcoal transition-colors text-sm md:text-base group/link">
                                Xem chất liệu
                                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                             </div>
                        </div>
                    </div>

                    {/* Inactive Label - Desktop (Vertical Text) */}
                    <div className={`hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap -rotate-90 origin-center transition-all duration-300 ${isActive ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                         <span className="text-charcoal/80 font-bold uppercase tracking-widest text-sm backdrop-blur-md bg-white/20 px-3 py-1 rounded-full">{color.name}</span>
                    </div>

                    {/* Inactive Label - Mobile (Horizontal Text Center) */}
                    <div className={`md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 w-full text-center px-2 ${isActive ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                         <span className="text-charcoal/90 font-bold uppercase tracking-widest text-xs block truncate backdrop-blur-md bg-white/20 py-1.5 px-3 rounded-full mx-auto w-max max-w-[90%]">{color.name}</span>
                    </div>

                    {/* Texture Overlay */}
                    <div className="absolute inset-0 bg-grain opacity-25 pointer-events-none mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/5 pointer-events-none"></div>
                </div>
              );
          })}
      </div>
    </section>
  );
};

export default ColorPalette;