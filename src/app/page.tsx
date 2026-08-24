'use client';

import React, { useState } from 'react';
import { Sparkles, Shield, Award } from 'lucide-react';
import { QUIZ_QUESTIONS } from '@/data/quizQuestions';
import { QuizLeadAnswers } from '@/types/quiz';
import { QuizStep } from '@/components/QuizStep';
import { LeadCapture } from '@/components/LeadCapture';
import { ResultScreen } from '@/components/ResultScreen';
import { calculateSettingMaturity, CalculationResult } from '@/lib/cortex';
import { saveQuizLead } from '@/services/leadService';

export default function Home() {
  // Wizard state: 0 à 10 (Questions 1 à 11), 11 (Capture lead), 12 (Résultat)
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Partial<QuizLeadAnswers>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [leadInfo, setLeadInfo] = useState<{ firstName: string; email: string; phone: string }>({
    firstName: '',
    email: '',
    phone: '',
  });
  const [calcResult, setCalcResult] = useState<CalculationResult | null>(null);

  const totalQuestions = QUIZ_QUESTIONS.length; // 11
  const isQuizStep = currentStepIndex < totalQuestions;
  const isCaptureStep = currentStepIndex === totalQuestions;
  const isResultStep = currentStepIndex === totalQuestions + 1;

  const currentQuestion = QUIZ_QUESTIONS[currentStepIndex];

  const handleSelectAnswer = (value: string) => {
    if (!currentQuestion) return;

    // Enregistrement de la réponse dans le state
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.key]: value,
    }));

    // Passage fluide à l'étape suivante sans rechargement de page
    setTimeout(() => {
      setCurrentStepIndex((prev) => prev + 1);
    }, 150);
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleLeadSubmit = async (formData: {
    firstName: string;
    email: string;
    phone: string;
  }) => {
    setIsSubmitting(true);
    setLeadInfo(formData);

    try {
      // 1. Calcul déterministe complet : Setting Maturity + Commercial Maturity & Priorité (Cortex)
      const result = calculateSettingMaturity(answers);
      setCalcResult(result);

      // 2. Envoi et sauvegarde dans Supabase (Memory)
      await saveQuizLead({
        first_name: formData.firstName,
        email: formData.email,
        phone: formData.phone,
        answers: answers as QuizLeadAnswers,
        setting_maturity_score: result.score,
        setting_maturity_level: result.level.level,
        setting_maturity_label: result.level.name,
        top_3_weaknesses: result.top3WeaknessKeys,
        commercial_maturity: result.commercialOpportunity.score,
        commercial_priority: result.commercialOpportunity.priority,
      });

      // 3. Affichage de la vue résultat personnalisée (l'utilisateur ne voit QUE son score setting)
      setCurrentStepIndex(totalQuestions + 1);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement dans Supabase :", error);
      // Même en cas d'erreur réseau, on permet à l'utilisateur de voir son diagnostic
      setCurrentStepIndex(totalQuestions + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStepIndex(0);
    setCalcResult(null);
  };

  // Progression globale
  const progressPercent = isResultStep
    ? 100
    : isCaptureStep
    ? 95
    : Math.round(((currentStepIndex + 1) / (totalQuestions + 1)) * 100);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white relative overflow-hidden flex flex-col justify-between">
      {/* Halos lumineux d'arrière-plan */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-600/10 via-indigo-600/5 to-transparent blur-3xl pointer-events-none"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Barre de navigation */}
      <header className="relative z-20 border-b border-slate-900/80 bg-slate-950/70 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Award className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base text-white tracking-tight leading-none">
                High Ticket Setting Qualifier
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Système d Audit & Diagnostic de Funnel
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400 font-medium">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Diagnostic gratuit & confidentiel</span>
            </div>
          </div>
        </div>

        {/* Barre de progression supérieure */}
        {!isResultStep && (
          <div className="w-full h-1 bg-slate-900">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        )}
      </header>

      {/* Section Hero / Corps du questionnaire */}
      <section className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-6 py-10 sm:py-14">
        {/* Titres du Hero à l'étape 0 */}
        {currentStepIndex === 0 && (
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-8 sm:mb-12 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Évalue ton acquisition commerciale en 2 minutes</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Découvre la maturité réelle de ton{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500">
                système de Setting
              </span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Identifie immédiatement le niveau de maturité de ton processus de prise de rendez-vous, détecte tes <strong className="text-slate-200">3 fuites majeures de conversion</strong> et obtiens un plan d action prioritaire.
            </p>
          </div>
        )}

        {/* Wizard Multi-étapes */}
        <div className="w-full">
          {isQuizStep && currentQuestion && (
            <QuizStep
              question={currentQuestion}
              currentStep={currentStepIndex + 1}
              totalSteps={totalQuestions}
              selectedAnswer={answers[currentQuestion.key as keyof QuizLeadAnswers]}
              onSelectAnswer={handleSelectAnswer}
              onPrevious={handlePrevious}
              canGoBack={currentStepIndex > 0}
            />
          )}

          {isCaptureStep && (
            <LeadCapture
              onSubmit={handleLeadSubmit}
              onPrevious={handlePrevious}
              isLoading={isSubmitting}
            />
          )}

          {isResultStep && calcResult && (
            <ResultScreen
              result={calcResult}
              firstName={leadInfo.firstName}
              onReset={handleReset}
            />
          )}
        </div>
      </section>

      {/* Pied de page */}
      <footer className="relative z-10 border-t border-slate-900/80 bg-slate-950/80 py-6 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} High Ticket Setting Qualifier. Tous droits réservés.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Next.js • TypeScript • Tailwind CSS • Supabase</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
