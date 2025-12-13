
import React from 'react';
import styles from './ColorPalette.module.scss';

const COLORS = [
  { id: 1, name: "Hồng Phấn", hex: "#fce7f3" },
  { id: 2, name: "Tím Mơ", hex: "#f3e8ff" },
  { id: 3, name: "Xanh Mint", hex: "#ccfbf1" },
  { id: 4, name: "Be Sáng", hex: "#fef3c7" },
  { id: 5, name: "Trắng Sữa", hex: "#fafafa" },
  { id: 6, name: "Cam Đào", hex: "#ffedd5" },
];

const ColorPalette: React.FC = () => {
  return (
    <section id="palette" className={styles.section}>
      <div className="container text-center">
        <h2 className={styles.title}>
          Bảng Màu <span className={styles.highlight}>Pastel</span>
        </h2>
        <p className={styles.subtitle}>
          Những gam màu ngọt ngào, lấy cảm hứng từ những viên kẹo đường và bầu trời lúc hoàng hôn.
        </p>

        <div className={styles.grid}>
          {COLORS.map((color) => (
            <div key={color.id} className={styles.colorItem}>
              <div className={styles.dropWrapper}>
                {/* Water Drop Shape */}
                <div 
                  className={styles.drop}
                  style={{ backgroundColor: color.hex }}
                >
                  {/* Highlight */}
                  <div className={styles.highlightDot}></div>
                </div>
              </div>
              
              <div className={styles.info}>
                <p className={styles.colorName}>{color.name}</p>
                <p className={styles.colorHex}>{color.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ColorPalette;
