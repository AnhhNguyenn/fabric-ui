
import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.glassContainer}`}>
        <div className={styles.grid}>
          
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>M</div>
              <span className={styles.logoText}>Muse</span>
            </div>
            <p className={styles.desc}>
              Mang đến vẻ đẹp mềm mại, thanh lịch cho người phụ nữ hiện đại thông qua những thước vải thượng hạng.
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.col}>
            <h4 className={styles.heading}>Khám Phá</h4>
            <ul className={styles.list}>
              <li><a href="#" className={styles.link}>Về chúng tôi</a></li>
              <li><a href="#" className={styles.link}>Bộ sưu tập</a></li>
              <li><a href="#" className={styles.link}>Câu chuyện thương hiệu</a></li>
              <li><a href="#" className={styles.link}>Blog thời trang</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.col}>
            <h4 className={styles.heading}>Liên Hệ</h4>
            <ul className={styles.list}>
              <li className={styles.contactItem}>
                <MapPin className={styles.iconPink} />
                <span>123 Pastel Street, Dream City</span>
              </li>
              <li className={styles.contactItem}>
                <Phone className={styles.iconPurple} />
                <span>+84 123 456 789</span>
              </li>
              <li className={styles.contactItem}>
                <Mail className={styles.iconTeal} />
                <span>hello@musefabric.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className={styles.col}>
             <h4 className={styles.heading}>Đăng Ký</h4>
             <p className={styles.descSmall}>Nhận thông báo về bộ sưu tập mới nhất.</p>
             <form className={styles.form}>
               <input 
                  type="email" 
                  placeholder="Email của bạn..." 
                  className={styles.input}
               />
               <button className={styles.btn}>
                 Theo Dõi
               </button>
             </form>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>© 2024 Muse Fabric. Designed with <span className={styles.heart}>♥</span></p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialLink}><Facebook size={20} /></a>
            <a href="#" className={styles.socialLink}><Instagram size={20} /></a>
            <a href="#" className={styles.socialLink}><Twitter size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
