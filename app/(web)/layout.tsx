'use client'
import React from 'react';
import Navbar from '../../components/Navbar/Navbar'; // Corrected path
import Footer from '../../components/Footer/Footer'; // Corrected path
import styles from './layout.module.scss';

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.webLayout}>
        <Navbar />
        <main className={styles.mainContent}>
            {children}
        </main>
        <Footer />
    </div>
  );
}
