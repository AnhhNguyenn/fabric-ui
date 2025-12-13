import React from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import styles from './Hero.module.scss';

const Hero: React.FC = () => {
  return (
    <section id="home" className={styles.heroSection}>
      {/* Background Blobs (CSS Animations) */}
      <div className={`${styles.blob} ${styles.blob1}`}></div>
      <div className={`${styles.blob} ${styles.blob2}`}></div>
      <div className={`${styles.blob} ${styles.blob3}`}></div>

      <div className={`container ${styles.gridContainer}`}>
        {/* Text Content */}
        <div className={styles.textContent}>
          <div className={styles.badge}>
            ✨ Bộ sưu tập Mùa Xuân 2025
          </div>
          <h1 className={styles.heading}>
            Vẻ Đẹp <span className={styles.gradientText}>Mềm Mại</span> <br/>
            Từ Thiên Nhiên
          </h1>
          <p className={styles.description}>
            Khám phá những thước vải Lụa, Umi và Tussi thượng hạng. 
            Mịn màng như làn mây, dịu dàng ôm ấp làn da của bạn.
          </p>
          
          <div className={styles.ctaGroup}>
            <button className={`${styles.btn} ${styles.btnPrimary} group`}>
              Xem Bộ Sưu Tập
              <ArrowRight size={16} className={styles.arrowIcon} />
            </button>
            <button className={`${styles.btn} ${styles.btnSecondary}`}>
              Tìm Hiểu Thêm
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className={styles.imageWrapper}>
          <div className={styles.imageBg}></div>
          <div className={styles.card}>
            <Image 
              src="https://images.unsplash.com/photo-1550614000-4b9519e0031c" 
              alt="Áo dài pastel mềm mại" 
              width={500}
              height={650}
              className={styles.mainImage}
              priority
            />
            {/* Overlay Gradient */}
            <div className={styles.overlay}></div>
            
            {/* Floating Badge */}
            <div className={styles.floatingBadge}>
              <div className={styles.badgeContent}>
                <div>
                  <p className={styles.badgeLabel}>Chất liệu</p>
                  <p className={styles.badgeValue}>Lụa Tơ Tằm 100%</p>
                </div>
                <div className={styles.heartIcon}>
                   <span>♥</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
