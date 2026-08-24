import React from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { QuizQuestionConfig } from '@/data/quizQuestions';

interface QuizStepProps {
  question: QuizQuestionConfig;
  currentStep: number;
  totalSteps: number;
  selectedAnswer?: string;
  onSelectAnswer: (value: string) => void;
  onPrevious: () => void;
  canGoBack: boolean;
}

export const QuizStep: React.FC<QuizStepProps> = ({
  question,
  currentStep,
  totalSteps,
  selectedAnswer,
  onSelectAnswer,
  onPrevious,
  canGoBack,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between mb-4">
        {canGoBack ? (
          <button
            onClick={onPrevious}
            type="button"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors duration-150 group px-2.5 py-1.5 rounded-lg hover:bg-slate-800/60 border border-transparent hover:border-slate-700/50"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Question précédente</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Questionnaire de qualification
          </div>
        )}

        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
          <span className="text-blue-400 font-bold">{currentStep}</span>
          <span className="text-slate-600">/</span>
          <span>{totalSteps}</span>
        </div>
      </div>

      {/* Question Header */}
      <div className="mb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
          <span>{question.category}</span>
          {question.hasScoringImpact ? (
            <span className="text-amber-400/90 ml-1 text-[11px]">• Impacte le score</span>
          ) : (
            <span className="text-slate-400 ml-1 text-[11px]">• Contexte stratégique</span>
          )}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
          {question.title}
        </h2>
        {question.subtitle && (
          <p className="text-sm text-slate-400 leading-relaxed">
            {question.subtitle}
          </p>
        )}
      </div>

      {/* Options List */}
      <div className="space-y-2.5">
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === option.label;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectAnswer(option.label)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group relative overflow-hidden ${
                isSelected
                  ? 'bg-blue-600/15 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                  : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800/80 hover:border-slate-700 text-slate-200'
              }`}
            >
              {isSelected && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 shadow-[0_0_12px_#3b82f6]"></div>
              )}
              <div className="flex items-center gap-3.5 pr-4">
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                    isSelected
                      ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30'
                      : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </div>
                <div>
                  <div className={`font-semibold text-sm sm:text-base ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                    {option.label}
                  </div>
                  {option.sublabel && (
                    <div className="text-xs text-slate-400 mt-0.5 font-normal">
                      {option.sublabel}
                    </div>
                  )}
                </div>
              </div>

              <div className="shrink-0 flex items-center">
                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5" />
          Sélectionnez une option pour continuer instantanément
        </span>
      </div>
    </div>
  );
};
