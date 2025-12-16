'use client';
import React from 'react';
import { Play, ArrowDown, Star } from 'lucide-react';

const Hero = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-start md:justify-center pt-32 pb-12 md:pt-0 overflow-hidden bg-lavender-blush z-0">
      
      {/* 1. Animated Background Blobs - Adjusted opacity for better readability */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 -left-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-pastel-pink rounded-full mix-blend-multiply filter blur-[60px] md:blur-[80px] opacity-60 animate-blob"></div>
        <div className="absolute top-0 -right-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-pastel-purple rounded-full mix-blend-multiply filter blur-[60px] md:blur-[80px] opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-pastel-mint rounded-full mix-blend-multiply filter blur-[60px] md:blur-[80px] opacity-60 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-grain opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="flex flex-col items-center text-center">
            
            {/* Top Tagline */}
            <div className="animate-fade-up opacity-0" style={{ animationDelay: '0.1s' }}>
                <div className="inline-flex items-center gap-2 md:gap-3 px-4 py-1.5 md:px-6 md:py-2 bg-white/40 backdrop-blur-md border border-white/50 rounded-full mb-6 md:mb-8 shadow-sm">
                    <Star size={12} className="text-deep-rose fill-deep-rose" />
                    <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-deep-rose uppercase">Bộ Sưu Tập Mới 2025</span>
                    <Star size={12} className="text-deep-rose fill-deep-rose" />
                </div>
            </div>

            {/* Explosive Typography - Responsive Sizing */}
            <div className="relative mb-8 md:mb-12 w-full max-w-5xl">
                {/* Background Giant Text - Only visible on larger screens to avoid clutter */}
                <h1 className="hidden md:block font-serif text-[18vw] leading-[0.8] text-deep-rose opacity-5 mix-blend-overlay absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none whitespace-nowrap">
                    RiCa
                </h1>
                
                <h1 className="relative font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-charcoal leading-[0.95] tracking-tight animate-fade-up opacity-0" style={{ animationDelay: '0.3s' }}>
                    <span className="block italic font-light text-deep-rose mb-2 md:mb-0">Softness</span>
                    <span className="block relative z-10">REVOLUTION</span>
                </h1>
                
                {/* Rotating Badge - Hidden on mobile */}
                <div className="absolute -top-6 -right-4 lg:-right-20 animate-spin-slow hidden md:block">
                     <svg viewBox="0 0 200 200" className="w-32 h-32 md:w-40 md:h-40">
                        <path id="curve" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" fill="transparent" />
                        <text className="text-[10px] font-bold uppercase tracking-widest text-deep-rose fill-current">
                            <textPath xlinkHref="#curve">
                                Premium Quality • Organic Material • 
                            </textPath>
                        </text>
                     </svg>
                </div>
            </div>

            {/* Description */}
            <div className="max-w-xs md:max-w-xl mx-auto mb-10 md:mb-16 animate-fade-up opacity-0" style={{ animationDelay: '0.5s' }}>
                <p className="text-lg md:text-2xl text-charcoal/80 font-light leading-relaxed">
                    Đánh thức mọi giác quan với bộ sưu tập lụa tơ tằm <span className="font-serif italic font-bold text-deep-rose">thượng hạng</span>.
                </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 animate-fade-up opacity-0 w-full sm:w-auto px-6 sm:px-0" style={{ animationDelay: '0.7s' }}>
                <button 
                    onClick={scrollToProducts}
                    className="w-full sm:w-auto relative px-8 py-4 md:px-12 md:py-5 bg-deep-rose text-white rounded-full font-bold text-sm md:text-lg tracking-wider overflow-hidden group hover:scale-105 transition-transform duration-300 shadow-glow cursor-pointer z-30"
                >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                        MUA NGAY <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-rose-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></div>
                </button>
                
                <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 md:py-5 rounded-full border border-rose-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer z-30">
                    <span className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-rose-100 flex items-center justify-center text-deep-rose group-hover:scale-110 transition-transform">
                        <Play size={14} fill="currentColor" />
                    </span>
                    <span className="font-bold text-charcoal tracking-wide text-sm md:text-base">XEM VIDEO</span>
                </button>
            </div>

            {/* Parallax Images - Optimized for Mobile (Stacked vs Floating) */}
            <div className="relative w-full mt-16 md:mt-20 max-w-6xl mx-auto h-auto md:h-[500px]">
                
                {/* Mobile: Grid Layout | Desktop: Absolute Floating */}
                <div className="grid grid-cols-2 gap-4 md:block">
                    {/* Left Image */}
                    <div className="md:absolute md:left-20 md:bottom-0 w-full md:w-72 lg:w-80 aspect-[3/4] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-elegant transform md:-rotate-6 md:hover:rotate-0 hover:scale-105 transition-all duration-700 z-20">
                        <img src="https://images.unsplash.com/photo-1549488497-695394236a28?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Fashion 1" />
                    </div>
                    
                    {/* Right Image */}
                    <div className="md:absolute md:right-20 md:top-0 w-full md:w-72 lg:w-80 aspect-[3/4] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-elegant transform md:rotate-6 md:hover:rotate-0 hover:scale-105 transition-all duration-700 z-20">
                        <img src="https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Fashion 2" />
                    </div>
                </div>

                {/* Center Circle - Absolute on both but sized differently */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full border-4 border-white shadow-2xl overflow-hidden z-30 group cursor-pointer animate-float" style={{ animationDelay: '1s' }}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                     <img src="https://images.unsplash.com/photo-1574351373516-787be4391269?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" alt="Texture" />
                     <div className="absolute inset-0 flex items-center justify-center z-20">
                        <span className="font-serif text-xl md:text-5xl text-white italic font-bold mix-blend-overlay">Silk.</span>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;