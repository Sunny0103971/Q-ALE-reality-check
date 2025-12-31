
import React, { useState } from 'react';
import { Role, AssessmentResponse } from './types';
import { SECTIONS_DATA, ROOT_CAUSES, RESPONSIBILITIES, TIMELINES } from './constants';
import { MaturitySelector } from './components/MaturitySelector';
import { ResultsDashboard } from './components/ResultsDashboard';

const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [step, setStep] = useState<'welcome' | 'assessment' | 'results'>('welcome');
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  const getRoleQuestions = () => {
    if (!currentRole) return [];
    switch (currentRole) {
      case Role.INSTITUTIONAL:
        return SECTIONS_DATA.filter(q => q.role === Role.FOUNDATION);
      case Role.MANAGER:
        return SECTIONS_DATA.filter(q => q.role === Role.FOUNDATION || q.role === Role.MANAGER);
      case Role.ORGANISER:
        return SECTIONS_DATA.filter(q => q.role === Role.ORGANISER);
      case Role.EDUCATOR:
        return SECTIONS_DATA.filter(q => q.role === Role.EDUCATOR);
      default:
        return [];
    }
  };

  const roleQuestions = getRoleQuestions();
  const currentQuestion = roleQuestions[currentQuestionIdx];
  const currentResponse = responses.find(r => r.questionId === currentQuestion?.id);

  const updateResponse = (updates: Partial<AssessmentResponse>) => {
    const newResponses = [...responses];
    const existingIdx = newResponses.findIndex(r => r.questionId === currentQuestion.id);
    
    const baseResponse = currentResponse || {
      questionId: currentQuestion.id,
      score: 0,
      evidence: ''
    };

    const updated = { ...baseResponse, ...updates };

    if (existingIdx >= 0) {
      newResponses[existingIdx] = updated;
    } else {
      newResponses.push(updated);
    }
    setResponses(newResponses);
  };

  const handleNext = () => {
    if (currentQuestionIdx < roleQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setStep('results');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    }
  };

  const reset = () => {
    setResponses([]);
    setCurrentQuestionIdx(0);
    setCurrentRole(null);
    setStep('welcome');
  };

  const progress = roleQuestions.length > 0 ? ((currentQuestionIdx + 1) / roleQuestions.length) * 100 : 0;

  const isMitigationRequired = currentResponse?.score === 1 || currentResponse?.score === 2;
  const isMitigationComplete = isMitigationRequired ? (
    currentResponse?.rootCause && 
    currentResponse?.actionPlan?.trim() && 
    currentResponse?.responsibility && 
    currentResponse?.timeline
  ) : !!currentResponse?.score;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Q-ALE <span className="text-indigo-600">Reality Check</span>
          </h1>
          <p className="mt-3 text-lg text-slate-600 max-w-xl mx-auto">
            The "Honest Truth" Assessment Tool for Quality Assurance in Adult Education.
          </p>
        </div>

        {step === 'welcome' && (
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 animate-in slide-in-from-bottom duration-500">
            <div className="text-center space-y-4 mb-8">
              <span className="text-5xl">🎯</span>
              <h2 className="text-2xl font-bold text-slate-800">Select Your Reality Check Role</h2>
              <p className="text-slate-500">Pick the lens through which you'll assess your practice.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[Role.INSTITUTIONAL, Role.MANAGER, Role.ORGANISER, Role.EDUCATOR].map(role => (
                <button
                  key={role}
                  onClick={() => {
                    setCurrentRole(role);
                    setStep('assessment');
                  }}
                  className="flex flex-col items-start p-6 bg-slate-50 rounded-2xl border-2 border-transparent hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
                >
                  <span className="block font-bold text-lg text-slate-800 group-hover:text-indigo-700">{role}</span>
                  <span className="text-xs text-slate-500 mt-1">
                    {role === Role.INSTITUTIONAL ? 'Foundation & Umbrella Mechanisms' : 
                     role === Role.MANAGER ? 'Strategy, HR & Compliance' : 
                     role === Role.ORGANISER ? 'Agile Curriculum & Design' : 
                     'The Classroom & Andragogical Vibe'}
                  </span>
                  <span className="mt-4 text-indigo-600 font-bold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center">
                    Start Assessment <span className="ml-1">→</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'assessment' && currentQuestion && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col min-h-[500px] animate-in slide-in-from-right duration-300">
            <div className="h-2 bg-slate-100 w-full">
              <div 
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
                    Section: {currentQuestion.section}
                  </span>
                  <div className="text-slate-400 text-sm font-medium">Step {currentQuestionIdx + 1} of {roleQuestions.length}</div>
                </div>
                <div className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">REF: {currentQuestion.id}</div>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-2xl font-bold text-slate-800 leading-tight">
                  {currentQuestion.text}
                </h3>
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
                  <p className="text-amber-800 italic text-sm font-medium">
                    👉 {currentQuestion.hint}
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Maturity Score</label>
                  <MaturitySelector 
                    currentScore={currentResponse?.score || 0}
                    onSelect={(score) => updateResponse({ score })}
                  />
                </div>

                {isMitigationRequired && (
                  <div className="bg-red-50 p-6 rounded-2xl border border-red-100 space-y-4 animate-in fade-in zoom-in duration-300">
                    <div className="flex items-center space-x-2 text-red-700 font-bold mb-2">
                      <span className="text-xl">🚨</span>
                      <h3>Oops! Mitigation Protocol Triggered</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-red-800 uppercase mb-1">Root Cause</label>
                        <select 
                          className="w-full bg-white border border-red-200 rounded-lg p-2 text-sm text-slate-700 focus:ring-2 focus:ring-red-400 outline-none"
                          value={currentResponse?.rootCause || ''}
                          onChange={(e) => updateResponse({ rootCause: e.target.value })}
                        >
                          <option value="">Select Root Cause...</option>
                          {ROOT_CAUSES.map(rc => <option key={rc} value={rc}>{rc}</option>)}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-bold text-red-800 uppercase mb-1">Responsibility</label>
                        <select 
                          className="w-full bg-white border border-red-200 rounded-lg p-2 text-sm text-slate-700 focus:ring-2 focus:ring-red-400 outline-none"
                          value={currentResponse?.responsibility || ''}
                          onChange={(e) => updateResponse({ responsibility: e.target.value })}
                        >
                          <option value="">Who is responsible?</option>
                          {RESPONSIBILITIES.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-red-800 uppercase mb-1">Corrective Action Plan</label>
                      <textarea 
                        className="w-full bg-white border border-red-200 rounded-lg p-3 text-sm text-slate-700 focus:ring-2 focus:ring-red-400 outline-none resize-none h-20"
                        placeholder="What is one small thing to do differently next time?"
                        value={currentResponse?.actionPlan || ''}
                        onChange={(e) => updateResponse({ actionPlan: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-red-800 uppercase mb-1">Timeline</label>
                      <select 
                        className="w-full bg-white border border-red-200 rounded-lg p-2 text-sm text-slate-700 focus:ring-2 focus:ring-red-400 outline-none"
                        value={currentResponse?.timeline || ''}
                        onChange={(e) => updateResponse({ timeline: e.target.value })}
                      >
                        <option value="">Select Timeline...</option>
                        {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between pt-8 border-t border-slate-100">
                  <button
                    onClick={handlePrev}
                    disabled={currentQuestionIdx === 0}
                    className="px-6 py-2 text-slate-600 font-bold disabled:opacity-30 hover:text-slate-900"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!isMitigationComplete}
                    className="px-10 py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 disabled:shadow-none transition-all"
                  >
                    {currentQuestionIdx === roleQuestions.length - 1 ? 'See Results' : 'Next'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'results' && (
          <ResultsDashboard 
            responses={responses} 
            role={currentRole}
            onReset={reset}
          />
        )}

        <div className="mt-12 text-center text-slate-400 text-[10px] uppercase tracking-widest">
          <p>Q-ALE Reality Check • 62-Point Quality Framework</p>
        </div>
      </div>
    </div>
  );
};

export default App;
