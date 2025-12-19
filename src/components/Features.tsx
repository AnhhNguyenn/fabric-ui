'use client';
import React from 'react';
import { FEATURES } from '../constants';

const Features = () => {
  return (
    <section className="py-20 bg-rose-50/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {FEATURES.map((feature) => (
            <div key={feature.id} className="flex flex-col items-center text-center group">
              <div className="mb-6 p-5 bg-white rounded-3xl shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
