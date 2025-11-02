
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
    type: Type.OBJECT,
    properties: {
        foodName: { type: Type.STRING, description: "A simple, common name for the food." },
        description: { type: Type.STRING, description: "A very simple, one-sentence description of the food." },
        nutrition: {
            type: Type.ARRAY,
            description: "A list of important nutrition facts for a standard 100g serving.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Name of the nutrient (e.g., Calories, Protein)." },
                    amount: { type: Type.STRING, description: "Amount of the nutrient." },
                    unit: { type: Type.STRING, description: "Unit of measurement (e.g., kcal, g)." },
                },
                required: ["name", "amount", "unit"],
            },
        },
        healthBenefits: {
            type: Type.ARRAY,
            description: "An array of 3-4 key health benefits, explained in simple terms.",
            items: { type: Type.STRING },
        },
        recipes: {
            type: Type.ARRAY,
            description: "An array of 2 very simple recipe ideas for this food.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Simple name of the recipe." },
                    ingredients: {
                        type: Type.ARRAY,
                        description: "A list of simple ingredients.",
                        items: { type: Type.STRING },
                    },
                    instructions: { type: Type.STRING, description: "Very simple, easy-to-follow cooking instructions." },
                },
                required: ["name", "ingredients", "instructions"],
            },
        },
    },
    required: ["foodName", "description", "nutrition", "healthBenefits", "recipes"],
};


export const analyzeFoodImage = async (base64ImageData: string, mimeType: string): Promise<AnalysisResult> => {
    const imagePart = {
        inlineData: {
            data: base64ImageData,
            mimeType,
        },
    };

    const textPart = {
        text: `You are a helpful nutrition expert for the Noorvion Fitness app. Your goal is to explain food in a very simple way, like you are talking to a 12-year-old student.
        Analyze the food in the image.
        Provide the information in JSON format. Do not include markdown backticks.
        Keep all descriptions and names easy to read and understand.`
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [textPart, imagePart] },
        config: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);

    return result as AnalysisResult;
};
