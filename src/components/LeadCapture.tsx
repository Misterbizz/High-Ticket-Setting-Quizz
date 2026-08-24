import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Lock, ShieldCheck, Sparkles, User, Mail, Phone, Loader2 } from 'lucide-react';

interface LeadCaptureProps {
  onSubmit: (formData: { firstName: string; email: string; phone: string }) => Promise<void>;
  onPrevious: () => void;
  isLoading: boolean;
}

export const LeadCapture: React.FC<LeadCaptureProps> = ({
  onSubmit,
  onPrevious,
  isLoading,
}) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ firstName?: string; email?: string; phone?: string }>({});

  const validate = () => {
    const newErrors: { firstName?: string; email?: string; phone?: string } = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'Veuillez renseigner votre prénom.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Veuillez renseigner votre adresse email.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Veuillez entrer une adresse email valide.';
    }

    const phoneRegex = /^[\d\s+\-().]{6,20}$/;
    if (!phone.trim()) {
      newErrors.phone = 'Veuillez renseigner votre numéro de téléphone.';
    } else if (!phoneRegex.test(phone.trim())) {
      newErrors.phone = 'Veuillez entrer un numéro de téléphone valide.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({ firstName: firstName.trim(), email: email.trim(), phone: phone.trim() });
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Top back button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onPrevious}
          type="button"
          disabled={isLoading}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors duration-150 group px-2.5 py-1.5 rounded-lg hover:bg-slate-800/60 border border-transparent hover:border-slate-700/50"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Modifier mes réponses</span>
        </button>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>11 / 11 Questions complétées</span>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/20 mb-2">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Ton diagnostic est prêt.
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto">
          Renseigne tes coordonnées ci-dessous pour débloquer immédiatement ton score, ton niveau de maturité et l analyse de tes 3 fuites majeures.
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl backdrop-blur-md relative"
      >
        {/* Prénom */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Prénom <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Ex: Alexandre"
              disabled={isLoading}
              className={`w-full pl-10 pr-4 py-3 bg-slate-950/70 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all text-sm ${
                errors.firstName
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                  : 'border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
              }`}
            />
          </div>
          {errors.firstName && (
            <p className="text-red-400 text-xs mt-1.5">{errors.firstName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Email professionnel <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alexandre@entreprise.com"
              disabled={isLoading}
              className={`w-full pl-10 pr-4 py-3 bg-slate-950/70 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all text-sm ${
                errors.email
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                  : 'border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>
          )}
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Téléphone <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+33 6 12 34 56 78"
              disabled={isLoading}
              className={`w-full pl-10 pr-4 py-3 bg-slate-950/70 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all text-sm ${
                errors.phone
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                  : 'border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1.5">{errors.phone}</p>
          )}
        </div>

        {/* Submit CTA */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 text-base"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Génération de votre diagnostic en cours...</span>
            </>
          ) : (
            <>
              <span>Découvrir mon niveau de maturité</span>
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </>
          )}
        </button>

        {/* Privacy Note */}
        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Données confidentielles et sécurisées • Aucun spam</span>
        </div>
      </form>
    </div>
  );
};
