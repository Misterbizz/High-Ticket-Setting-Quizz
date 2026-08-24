export type QuizLeadAnswers = {
  q1_lead_volume: string;
  q2_lead_source: string;
  q3_booking_rate: string;
  q4_show_rate: string;
  q5_qualification_rate: string;
  q6_closing_rate: string;
  q7_speed_to_lead: string;
  q8_follow_up: string;
  q9_urgency: string;
  q10_process_structure: string;
  q11_main_problem: string;
};

export type QuizLead = {
  id?: string;
  first_name: string;
  email: string;
  phone: string;
  answers: QuizLeadAnswers | Record<string, unknown>;
  setting_maturity_score: number;
  setting_maturity_level: number;
  setting_maturity_label: string;
  top_3_weaknesses: string[];
  commercial_maturity?: number | null;
  created_at?: string;
};
