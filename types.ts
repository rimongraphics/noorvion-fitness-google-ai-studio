
export interface Nutrient {
  name: string;
  amount: string;
  unit: string;
}

export interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string;
}

export interface AnalysisResult {
  id?: string;
  foodName: string;
  description: string;
  nutrition: Nutrient[];
  healthBenefits: string[];
  recipes: Recipe[];
}
