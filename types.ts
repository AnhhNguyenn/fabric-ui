import React from 'react';

export interface Product {
  id: number;
  name: string;
  type: 'Lụa' | 'Umi' | 'Tussi';
  price: string;
  image: string;
  tag: string;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ColorSwatch {
  id: number;
  name: string;
  hex: string;
}