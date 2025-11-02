
import React from 'react';

interface HeaderProps {
    isLoggedIn: boolean;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-bold text-brand-gray-dark">Noorvion Fitness</span>
        </div>
        {isLoggedIn && (
            <button
                onClick={onLogout}
                className="px-4 py-2 border border-transparent text-sm font-semibold rounded-md text-white bg-brand-green hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-dark shadow-md hover:shadow-lg focus:shadow-lg uppercase tracking-wider transition-all duration-200"
            >
                Logout
            </button>
        )}
      </div>
    </header>
  );
};
