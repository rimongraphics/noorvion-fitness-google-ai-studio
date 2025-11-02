
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ImageUploader } from './components/ImageUploader';
import { ResultCard } from './components/ResultCard';
import { Spinner } from './components/Spinner';
import { analyzeFoodImage } from './services/geminiService';
import { AnalysisResult } from './types';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { LoginScreen } from './components/LoginScreen';
import { MealDashboard } from './components/MealDashboard';

const loadingMessages = [
  "Looking at your food...",
  "Figuring out what's inside...",
  "Getting the details...",
  "Almost ready!",
];

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

  // New state for auth and meals
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [myMeals, setMyMeals] = useState<AnalysisResult[]>([]);

  useEffect(() => {
    // FIX: The return type of `setInterval` in the browser is `number`, not `NodeJS.Timeout`.
    let interval: number;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingMessage(prev => {
          const currentIndex = loadingMessages.indexOf(prev);
          const nextIndex = (currentIndex + 1) % loadingMessages.length;
          return loadingMessages[nextIndex];
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setAnalysis(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyzeClick = useCallback(async () => {
    if (!image) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      // Extract base64 data and mimeType from data URL
      const mimeType = image.substring(image.indexOf(':') + 1, image.indexOf(';'));
      const base64Data = image.split(',')[1];
      
      const result = await analyzeFoodImage(base64Data, mimeType);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze the image. The AI may be busy or the image format is not supported. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [image]);
  
  const resetScanner = () => {
    setImage(null);
    setAnalysis(null);
    setError(null);
    setIsLoading(false);
  };

  // Auth and Meal functions
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Optional: clear meals on logout
    setMyMeals([]);
    resetScanner();
  };

  const handleAddMeal = (meal: AnalysisResult) => {
    const mealWithId = { ...meal, id: `${Date.now()}-${Math.random()}` };
    setMyMeals(prevMeals => [...prevMeals, mealWithId]);
  };
  
  const handleRemoveMeal = (mealId: string) => {
    setMyMeals(prevMeals => prevMeals.filter(meal => meal.id !== mealId));
  };


  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-brand-gray-dark">
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center items-center gap-2">
                 <SparklesIcon className="w-8 h-8 text-brand-green" />
                 <h1 className="text-3xl md:text-4xl font-bold text-brand-gray-dark">Scan Your Food</h1>
            </div>
          <p className="mt-[6px] text-lg text-brand-gray">
            Take a picture of your meal to learn about it.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <ImageUploader 
            onImageUpload={handleImageUpload} 
            imagePreview={image}
            onAnalyze={handleAnalyzeClick}
            isLoading={isLoading}
            onReset={resetScanner}
            hasAnalysis={!!analysis}
          />

          {isLoading && (
            <div className="mt-6 flex flex-col items-center justify-center text-center">
              <Spinner />
              <p className="mt-4 text-brand-gray font-semibold animate-fade-in">{loadingMessage}</p>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="font-bold">An error occurred:</p>
              <p>{error}</p>
            </div>
          )}

          {analysis && !isLoading && (
            <div className="mt-6">
              <ResultCard result={analysis} onAddMeal={handleAddMeal} />
            </div>
          )}
        </div>

        <MealDashboard meals={myMeals} onRemoveMeal={handleRemoveMeal} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
