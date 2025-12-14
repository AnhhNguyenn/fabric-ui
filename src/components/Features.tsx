import React from 'react';
import { FEATURES } from '../constants.tsx';

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-lavender-blush md:-skew-x-12 opacity-50 z-0"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6">
            <h2 className="font-serif text-4xl md:text-7xl text-charcoal leading-tight">
                Why <span className="italic text-deep-rose">Muse?</span>
            </h2>
            <p className="text-base md:text-lg text-charcoal/60 max-w-md md:text-right border-b pb-4 border-rose-200">
                Chất lượng vượt trội. Thiết kế bền vững. <br className="hidden md:block" /> Cảm giác không thể chối từ.
            </p>
        </div>

        {/* Responsive Grid: 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
          {FEATURES.map((feature, index) => (
            <div 
                key={feature.id} 
                className={`group relative p-6 md:p-8 rounded-[2rem] border border-white/50 shadow-soft backdrop-blur-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 min-h-[280px] flex flex-col justify-between
                    ${index === 0 ? 'bg-gradient-to-br from-deep-rose to-rose-900 text-white sm:col-span-2' : 'bg-white/60 hover:bg-white'}
                `}
            >
              {/* Giant Number Background */}
              <span className={`absolute -bottom-8 -right-2 text-[8rem] md:text-[10rem] lg:text-[12rem] font-serif font-bold opacity-10 leading-none select-none transition-transform duration-700 group-hover:scale-125
                  ${index === 0 ? 'text-white' : 'text-deep-rose'}
              `}>
                  0{index + 1}
              </span>

              <div className="relative z-10 h-full flex flex-col">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-xl md:text-2xl mb-4 transition-transform duration-500 group-hover:rotate-12 flex-shrink-0
                      ${index === 0 ? 'bg-white/20 text-white' : 'bg-lavender-blush text-deep-rose'}
                  `}>
                    {feature.icon}
                  </div>
                  
                  <div className="flex-grow">
                      <h3 className={`font-serif text-2xl md:text-3xl font-bold mb-3 ${index === 0 ? 'text-white' : 'text-charcoal'}`}>
                          {feature.title}
                      </h3>
                      <p className={`text-sm md:text-base leading-relaxed ${index === 0 ? 'text-white/80' : 'text-charcoal/60'}`}>
                        {feature.description}
                      </p>
                  </div>
                  
                  <div className={`w-full h-1 mt-6 rounded-full overflow-hidden ${index === 0 ? 'bg-white/20' : 'bg-gray-100'}`}>
                      <div className={`h-full w-0 group-hover:w-full transition-all duration-1000 ease-out ${index === 0 ? 'bg-white' : 'bg-deep-rose'}`}>
                      </div>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;