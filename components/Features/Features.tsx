
import React from 'react';
import { Feather, Wind, Sun, Droplets } from 'lucide-react';
import styles from './Features.module.scss';

const FEATURES = [
  {
    id: 1,
    title: "Mềm Mại",
    description: "Cảm giác êm ái, nâng niu làn da nhạy cảm nhất.",
    icon: <Feather className={styles.iconRose} />
  },
  {
    id: 2,
    title: "Nhẹ Nhàng",
    description: "Trọng lượng siêu nhẹ, bay bổng trong từng chuyển động.",
    icon: <Wind className={styles.iconPurple} />
  },
  {
    id: 3,
    title: "Thoáng Khí",
    description: "Thấm hút tốt, giữ cho cơ thể luôn khô thoáng.",
    icon: <Droplets className={styles.iconTeal} />
  },
  {
    id: 4,
    title: "Mát Lạnh",
    description: "Chạm vào là mát, lý tưởng cho khí hậu nhiệt đới.",
    icon: <Sun className={styles.iconAmber} />
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className={styles.section}>
       <div className="container">
          <div className={styles.header}>
            <h2 className={styles.title}>
              Tinh Hoa Của <span className={styles.highlight}>Sự Dịu Dàng</span>
            </h2>
            <p className={styles.subtitle}>
              Mỗi thước vải được dệt nên từ sự tỉ mỉ, mang đến trải nghiệm tuyệt vời cho người mặc.
            </p>
          </div>

          <div className={styles.grid}>
            {FEATURES.map((feature) => (
              <div key={feature.id} className={styles.card}>
                <div className={styles.iconWrapper}>
                  {feature.icon}
                </div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDesc}>
                  {feature.description}
                </p>
                
                {/* Decorative blob */}
                <div className={styles.blob}></div>
              </div>
            ))}
          </div>
       </div>
    </section>
  );
};

export default Features;
