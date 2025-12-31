
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AssessmentResponse, SectionScore, Role } from '../types';
import { SECTIONS_DATA } from '../constants';
import { getImprovementAdvice } from '../services/geminiService';

interface ResultsDashboardProps {
  responses: AssessmentResponse[];
  role: Role | null;
  onReset: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ responses, role, onReset }) => {
  const [advice, setAdvice] = useState<Record<string, string>>({});
  const [loadingAdvice, setLoadingAdvice] = useState<string | null>(null);

  const calculateScores = (): SectionScore[] => {
    const sections: Record<string, { sum: number; count: number; gaps: number }> = {};
    
    responses.forEach(resp => {
      const q = SECTIONS_DATA.find(q => q.id === resp.questionId);
      if (q) {
        if (!sections[q.section]) {
          sections[q.section] = { sum: 0, count: 0, gaps: 0 };
        }
        sections[q.section].sum += resp.score;
        sections[q.section].count += 1;
        if (resp.score <= 2) sections[q.section].gaps += 1;
      }
    });

    return Object.entries(sections).map(([name, data]) => ({
      name,
      average: Number((data.sum / data.count).toFixed(1)),
      totalQuestions: data.count,
      gaps: data.gaps
    }));
  };

  const getFunnyMasteryTitle = (id: string, text: string): string => {
    // Funny mappings based on question content keywords
    if (text.toLowerCase().includes('feedback')) return "Feedback Whisperer";
    if (text.toLowerCase().includes('safe space')) return "Vibe Guardian";
    if (text.toLowerCase().includes('accessible') || text.toLowerCase().includes('disabilities')) return "Barrier Breaker";
    if (text.toLowerCase().includes('sustainability') || text.toLowerCase().includes('environment')) return "Eco-Warrior";
    if (text.toLowerCase().includes('pdca') || text.toLowerCase().includes('evaluation')) return "PDCA Perfectionist";
    if (text.toLowerCase().includes('stakeholder') || text.toLowerCase().includes('partners')) return "Network Ninja";
    if (text.toLowerCase().includes('inclusive') || text.toLowerCase().includes('discrimination')) return "Equality Overlord";
    if (text.toLowerCase().includes('finance') || text.toLowerCase().includes('funding')) return "Budget Wizard";
    if (text.toLowerCase().includes('curriculum') || text.toLowerCase().includes('design')) return "Curriculum Architect";
    if (text.toLowerCase().includes('critical thinking')) return "Mind Bender";
    if (text.toLowerCase().includes('gdpr') || text.toLowerCase().includes('data')) return "Privacy Paladin";
    
    // Default fallback based on ID
    if (id.startsWith('3.0')) return "Foundational Rockstar";
    if (id.startsWith('M')) return "Management Mogul";
    if (id.startsWith('C')) return "Organisation Oracle";
    if (id.startsWith('E')) return "Teaching Titan";
    return "The Expert";
  };

  const scores = calculateScores();
  const globalAverage = scores.length > 0 
    ? Number((scores.reduce((acc, s) => acc + s.average, 0) / scores.length).toFixed(1)) 
    : 0;
  
  const gaps = responses.filter(r => r.score <= 2);
  const growthOpportunities = responses.filter(r => r.score === 3 || r.score === 4);
  const mastery = responses.filter(r => r.score === 5);

  const handleFetchAdvice = async (questionId: string) => {
    const q = SECTIONS_DATA.find(x => x.id === questionId);
    const r = responses.find(x => x.questionId === questionId);
    if (!q || !r) return;

    setLoadingAdvice(questionId);
    const result = await getImprovementAdvice(q.text, r.score, q.hint);
    setAdvice(prev => ({ ...prev, [questionId]: result }));
    setLoadingAdvice(null);
  };

  const getBadgeAndSummary = () => {
    if (role === Role.INSTITUTIONAL && globalAverage >= 4.0 && gaps.length === 0) {
      return {
        badge: "Great ADU Organization - Jedi Council Level 🏛️",
        color: "bg-indigo-700",
        message: "Your organization has integrated quality assurance into its very DNA. You are a benchmark for institutional excellence.",
        emoji: "👑"
      };
    }

    if (globalAverage >= 4.5 && gaps.length === 0) {
      const badgeText = role === Role.EDUCATOR ? "Great Educator - Jedi Master Level 🧘" : "Jedi Master Level 🧘";
      return {
        badge: badgeText,
        color: "bg-indigo-600",
        message: "Incredible! You are operating at a level of integration that serves as a best practice example for others.",
        emoji: "✨"
      };
    }

    if (globalAverage >= 3.5) {
      return {
        badge: "The Well-Oiled Machine ⚙️",
        color: "bg-indigo-500",
        message: "You are consistent, monitored, and efficient. Now, focus on the 'DNA level' integration to reach the Council.",
        emoji: "🌟"
      };
    }

    if (globalAverage >= 2.5) {
      return {
        badge: "The Rulebook Practitioner 📘",
        color: "bg-blue-500",
        message: "You have policies in place, but you still follow them mostly because you 'have' to. Let's make it natural.",
        emoji: "🚀"
      };
    }

    return {
      badge: "The Cowboy Adventurer 🤠",
      color: "bg-red-500",
      message: "You are currently surviving on vibes and panic. It's time to build a foundation before the house falls.",
      emoji: "🚧"
    };
  };

  const summary = getBadgeAndSummary();

  const renderQuestionAdvice = (resp: AssessmentResponse, colorClass: string) => {
    const q = SECTIONS_DATA.find(x => x.id === resp.questionId);
    return (
      <div key={resp.questionId} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8 transition-all hover:shadow-md">
        <div className={`${colorClass} p-6 border-b border-opacity-20`}>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{q?.id}</span>
              <h4 className="font-bold text-slate-900 text-lg">{q?.text}</h4>
              <p className="text-slate-600 text-sm mt-1 italic leading-tight">"👉 {q?.hint}"</p>
            </div>
            <div className="bg-white/60 text-slate-900 px-4 py-1 rounded-full text-xs font-black whitespace-nowrap ml-4 border border-slate-200/50">
              Level {resp.score} / 5
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {resp.score <= 2 ? (
              <div className="space-y-4">
                <h5 className="font-bold text-red-700 text-xs uppercase tracking-widest flex items-center">
                  <span className="mr-2">🚨</span> Mandatory Mitigation Plan
                </h5>
                <div className="grid grid-cols-1 gap-3 p-4 bg-red-50/50 rounded-2xl border border-red-100">
                  <p><span className="text-[10px] font-bold text-slate-400 uppercase block">Root Cause</span> <span className="text-sm text-slate-800 font-medium">{resp.rootCause}</span></p>
                  <p><span className="text-[10px] font-bold text-slate-400 uppercase block">Action Plan</span> <span className="text-sm text-slate-800 font-medium">{resp.actionPlan}</span></p>
                  <div className="flex space-x-6">
                    <div><span className="text-[10px] font-bold text-slate-400 uppercase block">Responsibility</span> <span className="text-sm text-slate-800 font-medium">{resp.responsibility}</span></div>
                    <div><span className="text-[10px] font-bold text-slate-400 uppercase block">Timeline</span> <span className="text-sm text-slate-800 font-medium">{resp.timeline}</span></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 opacity-80">
                <span className="text-3xl mb-3">🌱</span>
                <p className="text-slate-600 text-sm font-semibold mb-1">Growth Mode Active</p>
                <p className="text-slate-500 text-xs max-w-xs">You have a solid foundation here, but you are still a few steps away from true "Jedi Master" integration.</p>
              </div>
            )}
          </div>

          <div className="space-y-4 bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100/50 flex flex-col">
            <div className="flex justify-between items-center border-b border-indigo-100 pb-3 mb-2">
              <h5 className="font-black text-indigo-800 text-xs uppercase tracking-widest flex items-center">
                <span className="mr-2">✨</span> Jedi ADU EDU Council
              </h5>
              {!advice[resp.questionId] && (
                <button
                  onClick={() => handleFetchAdvice(resp.questionId)}
                  disabled={loadingAdvice === resp.questionId}
                  className="text-[10px] font-black bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-all hover:scale-105 disabled:opacity-50"
                >
                  {loadingAdvice === resp.questionId ? 'SUMMONING...' : 'CONSULT COUNCIL'}
                </button>
              )}
            </div>
            
            {advice[resp.questionId] ? (
              <div className="text-slate-700 text-sm leading-relaxed prose prose-indigo max-w-none">
                <div 
                  className="space-y-4 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ 
                    __html: advice[resp.questionId]
                      .replace(/### (.*)/g, '<div class="text-indigo-900 font-black text-xs uppercase tracking-widest mt-4 mb-2">$1</div>')
                      .replace(/\* \*\?(.*?)\*\*: /g, '<div class="mb-3 pl-2 border-l-2 border-indigo-200"><strong>$1</strong>: ')
                      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-indigo-600 font-bold underline hover:no-underline decoration-2 underline-offset-2">$1</a>')
                  }} 
                />
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center py-6 text-center">
                <p className="text-slate-400 text-xs italic max-w-[200px]">
                  Request a structured strategy and professional methodologies to move from Level {resp.score} to Level 5.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Summary Badge */}
      <div className={`${summary.color} p-10 rounded-[3rem] text-white shadow-2xl shadow-indigo-100 flex flex-col items-center text-center space-y-5 overflow-hidden relative`}>
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 pointer-events-none">
          <span className="text-9xl">🏛️</span>
        </div>
        
        <div className="bg-white/20 p-5 rounded-full text-5xl mb-2 backdrop-blur-md border border-white/20 shadow-inner relative z-10">
          {summary.emoji}
        </div>
        
        <div className="space-y-2 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-tight">{summary.badge}</h2>
          <p className="max-w-2xl text-lg font-medium opacity-90 leading-relaxed px-4">{summary.message}</p>
        </div>

        {/* NEW: Mastery Zone titles in the header */}
        {mastery.length > 0 && (
          <div className="w-full max-w-2xl mt-4 relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 opacity-80">Acknowledged Mastery Zones</p>
            <div className="flex flex-wrap justify-center gap-2">
              {mastery.map(m => {
                const q = SECTIONS_DATA.find(x => x.id === m.questionId);
                const funnyTitle = getFunnyMasteryTitle(m.questionId, q?.text || "");
                return (
                  <span 
                    key={m.questionId} 
                    className="bg-white/20 text-[10px] font-black px-3 py-1.5 rounded-full backdrop-blur-md border border-white/30 whitespace-nowrap"
                  >
                    🏆 {funnyTitle}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-white/10 px-6 py-2 rounded-full text-sm font-black backdrop-blur-md border border-white/10 relative z-10">
          GLOBAL AVERAGE: {globalAverage} / 5
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
        <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center px-2">
          <span className="mr-3 p-2 bg-slate-100 rounded-xl">📊</span> Reality Check Breakdown
        </h2>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scores}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b', fontWeight: 600}} />
              <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="average" radius={[8, 8, 0, 0]} barSize={45}>
                {scores.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.average < 3 ? '#ef4444' : (entry.average >= 4.0 ? '#6366f1' : '#cbd5e1')} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Results Groups */}
      {gaps.length > 0 && (
        <section className="animate-in slide-in-from-bottom duration-500">
          <h3 className="text-xl font-black text-red-600 mb-6 flex items-center bg-red-50 w-fit px-4 py-2 rounded-2xl">
            <span className="mr-2">🚨</span> THE "OOPS" SECTION: URGENT GAPS
          </h3>
          {gaps.map(g => renderQuestionAdvice(g, 'bg-red-50'))}
        </section>
      )}

      {growthOpportunities.length > 0 && (
        <section className="animate-in slide-in-from-bottom delay-200 duration-500">
          <h3 className="text-xl font-black text-amber-600 mb-6 flex items-center bg-amber-50 w-fit px-4 py-2 rounded-2xl">
            <span className="mr-2">🌱</span> GROWTH PATH: SPACE FOR IMPROVEMENT
          </h3>
          <p className="text-slate-500 text-sm mb-6 px-2 italic font-medium">You've defined these areas, but true integration is still ahead. Consult the Council for the next steps.</p>
          {growthOpportunities.map(g => renderQuestionAdvice(g, 'bg-amber-50'))}
        </section>
      )}

      {mastery.length > 0 && (
        <section className="bg-indigo-50 p-10 rounded-[2.5rem] border border-indigo-100 shadow-inner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-black text-indigo-800 flex items-center">
              <span className="mr-2 p-2 bg-indigo-100 rounded-xl">🏆</span> FULL MASTERY DETAILS
            </h3>
            <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-black">
              {mastery.length} DOMAINS INTEGRATED
            </span>
          </div>
          <p className="text-indigo-600 text-sm mb-6 leading-relaxed font-medium">
            These are your "Jedi Master" zones. They serve as best-practice examples for the rest of your operations.
          </p>
          <div className="flex flex-wrap gap-2">
            {mastery.map(m => {
               const q = SECTIONS_DATA.find(x => x.id === m.questionId);
               const funnyTitle = getFunnyMasteryTitle(m.questionId, q?.text || "");
               return (
                <div key={m.questionId} className="bg-white p-4 rounded-2xl border border-indigo-200 shadow-sm flex flex-col items-center text-center space-y-1">
                  <span className="text-xs font-black text-indigo-600">{funnyTitle}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">REF {m.questionId}</span>
                </div>
               );
            })}
          </div>
        </section>
      )}

      {/* Footer / Reset */}
      <div className="pt-12 text-center space-y-6 border-t border-slate-200">
        <button
          onClick={onReset}
          className="px-10 py-5 bg-slate-900 text-white font-black rounded-3xl hover:bg-black transition-all hover:scale-105 shadow-2xl active:scale-95"
        >
          START NEW REALITY CHECK
        </button>
        <div className="space-y-1">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
            Q-ALE Reality Check Framework
          </p>
          <p className="text-slate-400 text-[9px] italic">
            Andragogical support provided by the Jedi ADU EDU Council (powered by Gemini).
          </p>
        </div>
      </div>
    </div>
  );
};
