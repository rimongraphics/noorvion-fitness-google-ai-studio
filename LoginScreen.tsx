
import React from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-brand-gray-dark p-4">
        <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold">Noorvion Fitness</h1>
            <p className="mt-[6px] text-lg text-brand-gray">Find out what's in your food.</p>
            <div className="mt-8">
                <button
                    onClick={onLogin}
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-md text-white bg-brand-green hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-dark shadow-md hover:shadow-lg focus:shadow-lg uppercase tracking-wider transition-all duration-200"
                >
                    Get Started
                </button>
            </div>
        </div>
    </div>
  );
};
