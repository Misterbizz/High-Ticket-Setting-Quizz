import React, { useEffect } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Flame,
  Layers,
  RotateCcw,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CalculationResult } from '@/lib/cortex';

interface ResultScreenProps {
  result: CalculationResult;
  firstName: string;
  onReset: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  firstName,
  onReset,
}) => {
  useEffect(() => {
    // Launch a celebratory particle burst on load
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#6366f1', '#10b981', '#f59e0b'],
      });
    } catch {
      // ignore
    }
  }, []);

  const { score, level, top3Weaknesses, dimensions, contextInsights } = result;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* Top Banner with greeting */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Diagnostic Personnalisé de {firstName}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Audit de Maturité Setting & Pipeline
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Voici l analyse détaillée de votre système de qualification et l identification des 3 principales fuites de conversion.
        </p>
      </div>

      {/* Main Score Hero Card */}
      <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* Circular Score display */}
          <div className="md:col-span-5 flex flex-col items-center justify-center text-center p-6 bg-slate-950/60 rounded-2xl border border-slate-800/80">
            <div className="relative w-40 h-40 flex items-center justify-center">
              {/* Outer SVG Gauge */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  className="text-slate-800 stroke-current"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  className="stroke-current text-blue-500 transition-all duration-1000 ease-out"
                  strokeWidth="10"
                  strokeDasharray={326.7}
                  strokeDashoffset={326.7 - (326.7 * score) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-white tracking-tight">
                  {score}
                </span>
                <span className="text-xs font-semibold text-slate-400">/ 100</span>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-xs text-slate-400 font-medium">
                Setting Maturity Score
              </span>
            </div>
          </div>

          {/* Level Info */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${level.badgeColor}`}
              >
                Niveau {level.level} / 4
              </span>
              <span className="text-lg font-bold text-white">
                {level.name}
              </span>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {level.description}
            </p>

            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                <Target className="w-4 h-4" />
                <span>Recommandation prioritaire</span>
              </div>
              <p className="text-sm font-semibold text-white">
                {level.priority}
              </p>
            </div>

            {contextInsights.specialWarning && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{contextInsights.specialWarning}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top 3 Fuites Détectées (Weakness Detection) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Tes 3 principales fuites de conversion
              </h2>
              <p className="text-xs text-slate-400">
                Classées par ratio de perte relative dans ton système
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {top3Weaknesses.map((w, index) => (
            <div
              key={w.key}
              className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-3 relative transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold flex items-center justify-center">
                    #{index + 1}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                    Fuite critique
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">
                  {w.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {w.explanation}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <div className="text-[11px] font-semibold text-amber-400/90 flex items-start gap-1.5">
                  <Zap className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{w.lossImpact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Breakdown of All 6 Dimensions */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold text-white">
              Détail des 6 Piliers de ton Setting
            </h3>
          </div>
          <span className="text-xs text-slate-400">Total : {score}/100 pts</span>
        </div>

        <div className="space-y-4">
          {Object.values(dimensions).map((dim) => {
            const percentage = Math.round(dim.relativeScore * 100);
            return (
              <div key={dim.key} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-slate-200">{dim.label}</span>
                  <span className="font-mono text-slate-300">
                    <span className="text-white font-bold">{dim.earned}</span> / {dim.max} pts ({percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 rounded-full ${
                      percentage >= 70
                        ? 'bg-emerald-500'
                        : percentage >= 40
                        ? 'bg-blue-500'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contextual Recap Info */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs">
          <span className="text-slate-400 block mb-1">Volume de leads</span>
          <span className="font-semibold text-white truncate block">
            {contextInsights.leadVolumeText}
          </span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs">
          <span className="text-slate-400 block mb-1">Source principale</span>
          <span className="font-semibold text-white truncate block">
            {contextInsights.leadSourceText}
          </span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs">
          <span className="text-slate-400 block mb-1">Niveau d urgence</span>
          <span className="font-semibold text-white truncate block">
            {contextInsights.urgencyText}
          </span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs">
          <span className="text-slate-400 block mb-1">Problème principal</span>
          <span className="font-semibold text-white truncate block">
            {contextInsights.mainProblemText}
          </span>
        </div>
      </div>

      {/* Call to Action: Book Diagnostic Call */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Calendar className="w-3.5 h-3.5" />
            <span>Session Stratégique Offerte</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Réserve ton diagnostic Setting
          </h2>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Profite d une session de 30 minutes avec l un de nos experts pour analyser tes 3 fuites détectées, concevoir un plan d action sur-mesure et booster tes rendez-vous qualifiés.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 hover:bg-slate-100 rounded-xl font-extrabold shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2.5 group text-base"
          >
            <span>Prendre rendez-vous maintenant</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="flex items-center justify-center gap-6 text-xs text-blue-200 pt-2 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            100% Personnalisé
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            Plan d action actionnable
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            Sans engagement
          </span>
        </div>
      </div>

      {/* Restart quiz option */}
      <div className="text-center pt-4">
        <button
          onClick={onReset}
          type="button"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-300 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Recommencer le diagnostic</span>
        </button>
      </div>
    </div>
  );
};
