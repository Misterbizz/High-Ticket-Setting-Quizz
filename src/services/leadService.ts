import { getSupabaseClient } from '@/lib/supabase';
import { QuizLead } from '@/types/quiz';

/**
 * Enregistre un lead qualifié avec ses métriques dans la table Supabase quiz_leads
 */
export async function saveQuizLead(leadData: QuizLead) {
  const supabase = getSupabaseClient();

  const insertPayload: Record<string, unknown> = {
    first_name: leadData.first_name,
    email: leadData.email,
    phone: leadData.phone,
    answers: leadData.answers,
    setting_maturity_score: leadData.setting_maturity_score,
    setting_maturity_level: leadData.setting_maturity_level,
    setting_maturity_label: leadData.setting_maturity_label,
    top_3_weaknesses: leadData.top_3_weaknesses,
    commercial_maturity: leadData.commercial_maturity ?? null,
  };

  // Ajout du champ optionnel commercial_priority s'il est présent
  if (leadData.commercial_priority) {
    insertPayload.commercial_priority = leadData.commercial_priority;
  }

  const { data, error } = await supabase
    .from('quiz_leads')
    .insert([insertPayload]);

  if (error) {
    console.error('Détails erreur Supabase:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    throw error;
  }

  return data;
}
