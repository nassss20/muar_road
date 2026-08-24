import React, { useState } from "react";
import { Sparkles, Loader2, Info } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function AiLifespanPredictor({ materialName, scheduleData }) {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generatePrediction = async () => {
    setLoading(true);
    setError(null);
    setPrediction(null);
    
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key is not configured in .env.local.");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

      const scheduleText = scheduleData.map(s => 
        `Year ${s.year}: ${s.activity} (Cost: RM ${s.cost})`
      ).join("\n");

      const prompt = `You are a Civil Engineering AI assistant. I have a 20-year Life Cycle Cost Analysis (LCCA) maintenance schedule for a road pavement material called "${materialName}".\n\nSchedule:\n${scheduleText}\n\nBased on this schedule, predict how long this material is typically expected to remain in "Good" condition before the FIRST major recurring defect, periodic maintenance, or significant corrective patching occurs (ignore routine monitoring and minor initial localized patching if they are very cheap, focus on when recurring or major maintenance begins).\n\nProvide your answer as a short, concise, and professional prediction (maximum 3 sentences). State the estimated "Good" lifespan in years.`;

      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      
      setPrediction(responseText);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to generate AI prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/50 dark:border-indigo-800/50">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-2 mb-1">
            <Sparkles size={16} className="text-indigo-500" />
            AI Lifespan Prediction
          </h3>
          <p className="text-xs text-indigo-700/70 dark:text-indigo-400/70 mb-3">
            Use Gemini AI to analyze the 20-year maintenance schedule and predict how long {materialName} will remain in good condition before requiring major maintenance.
          </p>
        </div>
        {!prediction && !loading && (
          <button
            onClick={generatePrediction}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
          >
            <Sparkles size={14} />
            Generate Prediction
          </button>
        )}
      </div>

      {loading && (
        <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-slate-900/50 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
          <Loader2 size={18} className="text-indigo-500 animate-spin" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Analyzing maintenance schedule for {materialName}...
          </span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl border border-red-200 dark:border-red-800/30">
          Error: {error}
        </div>
      )}

      {prediction && (
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-800/50 shadow-sm animate-fade-in relative group">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center shrink-0 mt-0.5">
              <Info size={16} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <div 
              className="flex-1 text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium"
              dangerouslySetInnerHTML={{ 
                __html: prediction
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold text-indigo-700 dark:text-indigo-300">$1</strong>')
                  .replace(/\n/g, '<br/>')
              }} 
            />
          </div>
          <button 
            onClick={generatePrediction}
            className="absolute top-4 right-4 text-xs text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Regenerate"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
