import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Send, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-rose-100">
        <div className="container mx-auto px-6 py-16">
            
            {/* Top Section: Logo, Mission, Newsletter */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start text-center lg:text-left">
                {/* Logo & Mission */}
                <div className="lg:w-1/3 flex flex-col items-center lg:items-start">
                    <div className="text-center lg:text-left">
                        <h1 className="font-serif text-4xl font-bold text-deep-rose tracking-tighter">MUSE</h1>
                        <p className="text-[10px] uppercase tracking-[0.4em] text-rose-accent mt-1 font-semibold">Fabric & Silk</p>
                    </div>
                    <p className="mt-6 max-w-sm text-charcoal/60 leading-relaxed font-light">
                        Vẻ đẹp đến từ những gì mềm mại và tự nhiên nhất. Muse Fabric & Silk mang đến những thước vải chất lượng, được dệt nên từ tình yêu và sự tôn trọng thiên nhiên.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="lg:w-1/3 grid grid-cols-2 gap-8 text-sm">
                    <div>
                        <h3 className="font-bold uppercase tracking-wider text-charcoal mb-4">Khám Phá</h3>
                        <ul className="space-y-3 font-light text-charcoal/70">
                            <li><a href="#products" className="hover:text-deep-rose transition-colors">Sản phẩm mới</a></li>
                            <li><a href="#palette" className="hover:text-deep-rose transition-colors">Bảng màu</a></li>
                            <li><a href="#" className="hover:text-deep-rose transition-colors">Câu chuyện thương hiệu</a></li>
                            <li><a href="#" className="hover:text-deep-rose transition-colors">Cửa hàng</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold uppercase tracking-wider text-charcoal mb-4">Hỗ Trợ</h3>
                        <ul className="space-y-3 font-light text-charcoal/70">
                            <li><a href="#" className="hover:text-deep-rose transition-colors">Chính sách đổi trả</a></li>
                            <li><a href="#" className="hover:text-deep-rose transition-colors">Câu hỏi thường gặp</a></li>
                            <li><a href="#" className="hover:text-deep-rose transition-colors">Hướng dẫn bảo quản</a></li>
                            <li><a href="#" className="hover:text-deep-rose transition-colors">Liên hệ</a></li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Signup */}
                <div className="lg:w-1/3 w-full max-w-md">
                    <h3 className="font-bold uppercase tracking-wider text-charcoal mb-4">Nhận Bản Tin</h3>
                    <p className="text-sm text-charcoal/60 mb-6 font-light">
                        Đừng bỏ lỡ các bộ sưu tập mới và ưu đãi độc quyền từ Muse.
                    </p>
                    <form className="flex items-center gap-2 bg-white border border-rose-100 p-2 rounded-xl focus-within:border-deep-rose focus-within:ring-2 focus-within:ring-deep-rose/20 transition-all shadow-soft">
                        <input 
                            type="email"
                            placeholder="Địa chỉ email của bạn"
                            className="w-full bg-transparent px-3 text-sm focus:outline-none placeholder:text-gray-300"
                        />
                        <button type="submit" className="p-2.5 rounded-lg bg-charcoal hover:bg-deep-rose text-white transition-colors">
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Section: Copyright & Socials */}
            <div className="mt-16 pt-8 border-t border-rose-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-xs text-charcoal/50 flex items-center gap-1.5">
                    © {new Date().getFullYear()} Muse. Made with <Heart size={12} className="text-deep-rose fill-current"/> in Vietnam.
                </p>
                <div className="flex items-center gap-4">
                    <a href="#" className="text-charcoal/40 hover:text-deep-rose transition-colors"><Facebook size={18} /></a>
                    <a href="#" className="text-charcoal/40 hover:text-deep-rose transition-colors"><Instagram size={18} /></a>
                    <a href="#" className="text-charcoal/40 hover:text-deep-rose transition-colors"><Twitter size={18} /></a>
                    <a href="#" className="text-charcoal/40 hover:text-deep-rose transition-colors"><Youtube size={18} /></a>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;