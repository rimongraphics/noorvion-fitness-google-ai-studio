
import React, { useState, useEffect } from 'react';
import { AnalysisResult } from '../types';

interface ResultCardProps {
  result: AnalysisResult;
  onAddMeal: (meal: AnalysisResult) => void;
}

const InfoSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="text-xl font-bold text-brand-green-dark mb-3 pb-2 border-b-2 border-brand-green-light">{title}</h3>
        {children}
    </div>
);


export const ResultCard: React.FC<ResultCardProps> = ({ result, onAddMeal }) => {
  const [isAdded, setIsAdded] = useState(false);

  // Reset isAdded state when the result changes
  useEffect(() => {
    setIsAdded(false);
  }, [result]);

  const handleAddClick = () => {
    onAddMeal(result);
    setIsAdded(true);
  };

  return (
    <div className="bg-white rounded-2xl p-6 animate-fade-in">
        <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-brand-gray-dark tracking-tight">{result.foodName}</h2>
            <p className="mt-2 text-md text-brand-gray">{result.description}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                 <InfoSection title="What's Inside (per 100g)">
                    <div className="space-y-2">
                        {result.nutrition.map((nutrient, index) => (
                            <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                                <span className="font-semibold text-gray-700">{nutrient.name}</span>
                                <span className="text-gray-900 font-medium">{nutrient.amount} {nutrient.unit}</span>
                            </div>
                        ))}
                    </div>
                </InfoSection>
                
                <InfoSection title="Why It's Good For You">
                    <ul className="space-y-2 list-none">
                        {result.healthBenefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                                <svg className="w-5 h-5 text-brand-green mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </InfoSection>
            </div>
            
            <div>
                 <InfoSection title="Easy Recipe Ideas">
                    <div className="space-y-4">
                        {result.recipes.map((recipe, index) => (
                            <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <h4 className="font-bold text-lg text-brand-gray-dark">{recipe.name}</h4>
                                <div className="mt-2">
                                    <h5 className="font-semibold text-sm text-gray-600">Ingredients:</h5>
                                    <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                                        {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                                    </ul>
                                </div>
                                <div className="mt-3">
                                    <h5 className="font-semibold text-sm text-gray-600">Instructions:</h5>
                                    <p className="text-sm text-gray-700 mt-1">{recipe.instructions}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </InfoSection>
            </div>
        </div>
        <div className="mt-8 text-center">
            <button
                onClick={handleAddClick}
                disabled={isAdded}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white bg-brand-green hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-dark disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg focus:shadow-lg uppercase tracking-wider transition-all duration-200"
            >
                {isAdded ? 'Added to Your Log!' : 'Add to My Meals'}
            </button>
        </div>
    </div>
  );
};
