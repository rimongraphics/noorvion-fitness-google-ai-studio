
import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { TrashIcon } from './icons/TrashIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface MealDashboardProps {
  meals: AnalysisResult[];
  onRemoveMeal: (id: string) => void;
}

const MealCard: React.FC<{ meal: AnalysisResult; onRemove: (id: string) => void }> = ({ meal, onRemove }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const calories = meal.nutrition.find(n => n.name.toLowerCase() === 'calories');

    const handleRemoveClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the card from toggling when the remove button is clicked
        onRemove(meal.id!);
    };

    return (
        <div 
            className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl"
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="flex justify-between items-center">
                <div>
                    <h4 className="font-bold text-brand-gray-dark">{meal.foodName}</h4>
                    <p className="text-sm text-brand-gray">{calories ? `${calories.amount} ${calories.unit}` : 'Nutrition info unavailable'}</p>
                </div>
                <div className="flex items-center space-x-1">
                    <button
                        onClick={handleRemoveClick}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label={`Remove ${meal.foodName}`}
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                    <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
            </div>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-96 mt-4 pt-4 border-t border-gray-200' : 'max-h-0'}`}>
                <h5 className="font-semibold text-brand-gray-dark mb-2 text-sm">Full Nutritional Details (per 100g)</h5>
                <div className="space-y-1">
                    {meal.nutrition.map((nutrient, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-md text-sm">
                            <span className="font-medium text-gray-600">{nutrient.name}</span>
                            <span className="text-gray-800 font-mono">{nutrient.amount} {nutrient.unit}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export const MealDashboard: React.FC<MealDashboardProps> = ({ meals, onRemoveMeal }) => {
    
  return (
    <div className="max-w-3xl mx-auto mt-12 mb-8">
        <h2 className="text-2xl font-bold text-brand-gray-dark text-center mb-6">Your Food Log</h2>
        {meals.length === 0 ? (
            <div className="text-center py-10 px-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-brand-gray-dark">Your food log is empty.</h3>
                <p className="mt-2 text-brand-gray">Scan a meal to get started!</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {meals.map((meal) => (
                    <MealCard key={meal.id} meal={meal} onRemove={onRemoveMeal} />
                ))}
            </div>
        )}
    </div>
  );
};
