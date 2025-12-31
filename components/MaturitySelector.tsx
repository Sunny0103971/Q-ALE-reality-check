
import React from 'react';
import { MATURITY_LEVELS } from '../constants';

interface MaturitySelectorProps {
  currentScore: number;
  onSelect: (score: number) => void;
}

export const MaturitySelector: React.FC<MaturitySelectorProps> = ({ currentScore, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 w-full">
      {MATURITY_LEVELS.map((level) => (
        <button
          key={level.level}
          onClick={() => onSelect(level.level)}
          className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center text-center space-y-1 ${
            currentScore === level.level
              ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200'
              : 'border-slate-200 bg-white hover:border-indigo-300'
          }`}
        >
          <span className="text-2xl">{level.emoji}</span>
          <span className="text-xs font-bold text-indigo-900 uppercase tracking-tighter">Level {level.level}</span>
          <span className="text-[10px] leading-tight text-slate-600 font-medium">{level.label}</span>
        </button>
      ))}
    </div>
  );
};
