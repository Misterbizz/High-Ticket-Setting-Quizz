import { supabase } from '@/lib/supabase';
import { QuizLead } from '@/types/quiz';

/**
 * Saves a completed quiz lead into the Supabase database
 */
export async function saveQuizLead(leadData: QuizLead) {
  const { data, error } = await supabase
    .from('quiz_leads')
    .insert([
      {
        first_name: leadData.first_name,
        email: leadData.email,
        phone: leadData.phone,
        answers: leadData.answers,
        setting_maturity_score: leadData.setting_maturity_score,
        setting_maturity_level: leadData.setting_maturity_level,
        setting_maturity_label: leadData.setting_maturity_label,
        top_3_weaknesses: leadData.top_3_weaknesses,
        commercial_maturity: leadData.commercial_maturity ?? null,
      },
    ])
    .select('id');

  if (error) {
    console.error('Error saving quiz lead to Supabase:', error);
    throw error;
  }

  return data;
}
