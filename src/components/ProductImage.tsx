
// src/components/ProductImage.tsx
'use client';

import React, { useState } from 'react';
import { ImageIcon } from 'lucide-react';

interface ProductImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
}

export default function ProductImage({ src, alt, className, ...props }: ProductImageProps) {
  const [error, setError] = useState(!src); // Mặc định là lỗi nếu không có src

  if (error) {
    return (
      <div className={`w-full h-full bg-gray-100 flex items-center justify-center ${className}`}>
        <ImageIcon className="w-1/4 h-1/4 text-gray-300" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}
