import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-4 py-6 text-center text-brand-gray">
        <p>&copy; {new Date().getFullYear()} <a href="https://noorvion.com" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:text-brand-green-dark hover:underline">Noorvion Fitness</a>. All rights reserved.</p>
        <p className="text-sm mt-1">Nourishing your body, one meal at a time.</p>
      </div>
    </footer>
  );
};