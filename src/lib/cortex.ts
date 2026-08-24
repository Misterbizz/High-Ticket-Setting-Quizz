import { QuizLeadAnswers, CommercialPriority } from '@/types/quiz';

export type DimensionKey =
  | 'booking_rate'
  | 'show_rate'
  | 'qualification_rate'
  | 'closing_rate'
  | 'speed_to_lead'
  | 'follow_up';

export interface DimensionResult {
  key: DimensionKey;
  label: string;
  earned: number;
  max: number;
  relativeScore: number; // 0 to 1
  explanation: string;
  recommendation: string;
}

export interface MaturityLevel {
  level: number;
  name: string;
  description: string;
  priority: string;
  badgeColor: string;
  gradient: string;
}

export interface WeaknessInfo {
  key: DimensionKey;
  label: string;
  title: string;
  explanation: string;
  lossImpact: string;
}

export interface CommercialOpportunityResult {
  score: number;
  priority: CommercialPriority;
}

export interface CalculationResult {
  score: number;
  level: MaturityLevel;
  dimensions: Record<DimensionKey, DimensionResult>;
  top3Weaknesses: WeaknessInfo[];
  top3WeaknessKeys: string[];
  commercialOpportunity: CommercialOpportunityResult;
  contextInsights: {
    leadVolumeText: string;
    leadSourceText: string;
    urgencyText: string;
    processText: string;
    mainProblemText: string;
    specialWarning?: string;
  };
}

// Dimension point tables for Setting Maturity
export const BOOKING_POINTS: Record<string, number> = {
  'Moins de 10 %': 0,
  '10 à 20 %': 5,
  '21 à 30 %': 10,
  '31 à 40 %': 17,
  '41 à 60 %': 22,
  'Plus de 60 %': 25,
  'Je ne connais pas mon taux': 0,
};

export const SHOW_POINTS: Record<string, number> = {
  'Moins de 50 %': 0,
  '50 à 60 %': 3,
  '61 à 70 %': 6,
  '71 à 80 %': 10,
  '81 à 90 %': 13,
  'Plus de 90 %': 15,
  'Je ne connais pas mon taux': 0,
};

export const QUALIFICATION_POINTS: Record<string, number> = {
  'Moins de 20 %': 0,
  '20 à 40 %': 3,
  '41 à 60 %': 7,
  '61 à 75 %': 10,
  '76 à 90 %': 13,
  'Plus de 90 %': 15,
  'Je ne mesure pas cette donnée': 0,
};

export const CLOSING_POINTS: Record<string, number> = {
  'Moins de 10 %': 0,
  '10 à 20 %': 2,
  '21 à 30 %': 5,
  '31 à 40 %': 7,
  '41 à 50 %': 9,
  'Plus de 50 %': 10,
  'Je ne connais pas mon taux de closing': 0,
};

export const SPEED_POINTS: Record<string, number> = {
  'Moins de 5 minutes': 20,
  '5 à 15 minutes': 17,
  '15 à 60 minutes': 12,
  '1 à 4 heures': 7,
  'Dans la journée': 3,
  'Plus de 24 heures': 0,
  "Il n'y a pas de délai défini": 0,
};

export const FOLLOWUP_POINTS: Record<string, number> = {
  '0 relance': 0,
  '1 à 2 relances': 3,
  '3 à 5 relances': 8,
  '6 à 8 relances': 12,
  '9 relances ou plus': 15,
  "Je n'ai pas de nombre défini / je relance au feeling": 0,
  "Je n'ai pas de process précis": 0,
};

// Commercial Maturity Scoring Tables
export const COMMERCIAL_VOLUME_POINTS: Record<string, number> = {
  'Moins de 15 leads/jour': 5,
  '15 à 30 leads/jour': 12,
  '31 à 50 leads/jour': 20,
  '51 à 100 leads/jour': 26,
  'Plus de 100 leads/jour': 30,
};

export const COMMERCIAL_URGENCY_POINTS: Record<string, number> = {
  "Ce n'est pas une priorité": 0,
  "J'aimerais l'améliorer dans les prochains mois": 8,
  'Je cherche actuellement une solution': 20,
  "C'est une priorité ce mois-ci": 26,
  "C'est l'un de mes principaux blocages actuellement": 30,
};

export const COMMERCIAL_PROBLEM_POINTS: Record<string, number> = {
  'Je ne génère pas assez de leads': 5,
  'Mes leads répondent peu': 18,
  'Pas assez de leads prennent RDV': 20,
  'Trop de no-shows': 18,
  'Mes RDV sont mal qualifiés': 20,
  'Mes prospects ne closent pas': 10,
  'Mon équipe manque de process': 20,
  'Je ne sais pas où se situe le problème': 15,
};

export const COMMERCIAL_PROCESS_POINTS: Record<string, number> = {
  "Rien n'est formalisé": 10,
  'Quelques scripts / templates': 15,
  'Un script principal': 18,
  'Scripts + séquences de relance': 20,
  'Process complet documenté': 12,
  'Process documenté + KPI + optimisation régulière': 5,
};

export const MATURITY_LEVELS: Record<number, MaturityLevel> = {
  1: {
    level: 1,
    name: 'Setting improvisé',
    description:
      'Le système repose principalement sur des actions manuelles, irrégulières ou peu mesurées.',
    priority: 'Mettre en place les fondamentaux du process.',
    badgeColor: 'bg-red-500/10 text-red-400 border-red-500/30',
    gradient: 'from-red-500 to-amber-500',
  },
  2: {
    level: 2,
    name: 'Setting en construction',
    description:
      'Certaines bases existent mais plusieurs étapes du funnel provoquent encore des pertes importantes.',
    priority: 'Identifier les principales fuites et standardiser le process.',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    gradient: 'from-amber-500 to-yellow-400',
  },
  3: {
    level: 3,
    name: 'Setting structuré',
    description:
      'Le système transforme déjà correctement les leads en opportunités commerciales, mais plusieurs optimisations restent possibles.',
    priority:
      'Optimiser les conversions, automatiser et améliorer les KPI faibles.',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    gradient: 'from-blue-500 to-cyan-400',
  },
  4: {
    level: 4,
    name: 'Setting scalable',
    description: 'Le process est rapide, structuré et performant.',
    priority:
      'Optimisation avancée, scalabilité et pilotage précis par la data.',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    gradient: 'from-emerald-500 to-teal-400',
  },
};

const DIMENSION_METADATA: Record<
  DimensionKey,
  {
    label: string;
    max: number;
    explanation: (answer: string) => string;
    lossImpact: string;
    recommendation: string;
  }
> = {
  booking_rate: {
    label: 'Taux de prise de RDV (Booking Rate)',
    max: 25,
    explanation: (ans) =>
      ans.includes('Je ne connais pas')
        ? "Absence de mesure précise de votre conversion Lead → Appel, ce qui masque l'efficacité de vos prises de contact."
        : `Avec une conversion déclarée de "${ans}", une part significative de vos leads chauds ne franchit pas l'étape de l'agenda.`,
    lossImpact:
      'Pertes massives dès la première prise de contact avant même la découverte de votre offre.',
    recommendation:
      'Restructurer les amorces de conversation et implémenter des ponts conversationnels dynamiques.',
  },
  show_rate: {
    label: 'Taux de présence aux appels (Show Rate)',
    max: 15,
    explanation: (ans) =>
      ans.includes('Je ne connais pas')
        ? 'Vos no-shows ne sont pas suivis rigoureusement, gaspillant des créneaux dans vos agendas.'
        : `Avec un taux de présence de "${ans}", les absences en session commerciale réduisent directement votre ROI publicitaire.`,
    lossImpact:
      'Créneaux bloqués sans valeur générée et baisse de motivation des closers.',
    recommendation:
      'Déployer des séquences de confirmation multicanales (SMS, WhatsApp, vidéo de pré-cadrage).',
  },
  qualification_rate: {
    label: 'Taux de qualification (Quality Rate)',
    max: 15,
    explanation: (ans) =>
      ans.includes('Je ne mesure pas')
        ? 'Aucun filtre systématique ne pré-qualifie le budget et le besoin avant le rendez-vous commercial.'
        : `Avec "${ans}" de prospects qualifiés, trop de temps est passé avec des profils hors-cible.`,
    lossImpact:
      "Perte de temps précieux en appel avec des prospects qui n'ont pas les moyens ou le besoin adéquat.",
    recommendation:
      'Renforcer les questions de cadrage budgétaire et les critères stricts de pré-qualification.',
  },
  closing_rate: {
    label: 'Taux de Closing',
    max: 10,
    explanation: (ans) =>
      ans.includes('Je ne connais pas')
        ? 'Le ratio de signature finale manque de traçabilité claire.'
        : `Votre taux de conversion final ("${ans}") indique une marge de progression sur le passage à l'action.`,
    lossImpact:
      'Sous-monétisation des opportunités qualifiées amenées en session.',
    recommendation:
      "Harmoniser les attentes créées lors du setting avec la phase d'offre en closing.",
  },
  speed_to_lead: {
    label: 'Vitesse de contact (Speed-to-lead)',
    max: 20,
    explanation: (ans) =>
      ans.includes('délai défini')
        ? 'Délai de réponse aléatoire : la chaleur et lintérêt du prospect chutent de 80% après 15 minutes.'
        : `Délai actuel : "${ans}". Les leads contactés au-delà de 15 minutes ont une probabilité de conversion drastiquement inférieure.`,
    lossImpact:
      "Perte d'attention instantanée du prospect parti consulter des alternatives.",
    recommendation:
      'Mettre en place des alertes instantanées et un temps de premier contact inférieur à 5-15 minutes.',
  },
  follow_up: {
    label: 'Protocole de Relance (Follow-up)',
    max: 15,
    explanation: (ans) =>
      ans.includes('feeling') || ans.includes('process')
        ? 'Relances irrégulières sans cadence programmée : plus de 60% des conversions se font après la 4e relance.'
        : `Nombre de relances : "${ans}". La majorité des ventes High Ticket se concluent au-delà de 5 relances structurées.`,
    lossImpact:
      'Abandon prématuré de leads pourtant intéressés par votre proposition.',
    recommendation:
      'Installer un protocole multicanal de 6 à 9 relances à forte valeur ajoutée.',
  },
};

/**
 * Calcul déterministe complet : Score Setting + Score d'Opportunité Commerciale
 */
export function calculateSettingMaturity(
  answers: Partial<QuizLeadAnswers>
): CalculationResult {
  // 1. Setting Maturity Score Calculation (Q3 - Q8)
  const q3 = answers.q3_booking_rate || 'Je ne connais pas mon taux';
  const q4 = answers.q4_show_rate || 'Je ne connais pas mon taux';
  const q5 = answers.q5_qualification_rate || 'Je ne mesure pas cette donnée';
  const q6 = answers.q6_closing_rate || 'Je ne connais pas mon taux de closing';
  const q7 = answers.q7_speed_to_lead || "Il n'y a pas de délai défini";
  const q8 = answers.q8_follow_up || "Je n'ai pas de process précis";

  const pBooking = BOOKING_POINTS[q3] ?? 0;
  const pShow = SHOW_POINTS[q4] ?? 0;
  const pQualif = QUALIFICATION_POINTS[q5] ?? 0;
  const pClosing = CLOSING_POINTS[q6] ?? 0;
  const pSpeed = SPEED_POINTS[q7] ?? 0;
  const pFollow = FOLLOWUP_POINTS[q8] ?? 0;

  const totalSettingScore = Math.min(
    100,
    Math.max(0, pBooking + pShow + pQualif + pClosing + pSpeed + pFollow)
  );

  let levelNumber = 1;
  if (totalSettingScore >= 76) levelNumber = 4;
  else if (totalSettingScore >= 51) levelNumber = 3;
  else if (totalSettingScore >= 26) levelNumber = 2;
  else levelNumber = 1;

  const level = MATURITY_LEVELS[levelNumber];

  // Calculate relative scores for weakness ranking (earned / max)
  const dimEntries: { key: DimensionKey; earned: number; max: number }[] = [
    { key: 'booking_rate', earned: pBooking, max: 25 },
    { key: 'show_rate', earned: pShow, max: 15 },
    { key: 'qualification_rate', earned: pQualif, max: 15 },
    { key: 'closing_rate', earned: pClosing, max: 10 },
    { key: 'speed_to_lead', earned: pSpeed, max: 20 },
    { key: 'follow_up', earned: pFollow, max: 15 },
  ];

  const dimensionsMap: Record<DimensionKey, DimensionResult> = {} as any;

  const rankedDimensions = dimEntries.map((dim) => {
    const meta = DIMENSION_METADATA[dim.key];
    const rel = dim.earned / dim.max;
    const answerVal =
      dim.key === 'booking_rate'
        ? q3
        : dim.key === 'show_rate'
        ? q4
        : dim.key === 'qualification_rate'
        ? q5
        : dim.key === 'closing_rate'
        ? q6
        : dim.key === 'speed_to_lead'
        ? q7
        : q8;

    const resultObj: DimensionResult = {
      key: dim.key,
      label: meta.label,
      earned: dim.earned,
      max: dim.max,
      relativeScore: rel,
      explanation: meta.explanation(answerVal),
      recommendation: meta.recommendation,
    };
    dimensionsMap[dim.key] = resultObj;

    return {
      ...resultObj,
      lossImpact: meta.lossImpact,
    };
  });

  // Sort ascending by relative score (weakest first)
  rankedDimensions.sort((a, b) => a.relativeScore - b.relativeScore);

  const top3 = rankedDimensions.slice(0, 3);
  const top3Weaknesses: WeaknessInfo[] = top3.map((w) => ({
    key: w.key,
    label: w.label,
    title: w.label.split('(')[0].trim(),
    explanation: w.explanation,
    lossImpact: w.lossImpact,
  }));

  // 2. Commercial Maturity / Opportunity Calculation (Q1, Q9, Q11, Q10)
  const q1 = answers.q1_lead_volume || 'Moins de 15 leads/jour';
  const q2 = answers.q2_lead_source || 'Non spécifié';
  const q9 = answers.q9_urgency || "Ce n'est pas une priorité";
  const q10 = answers.q10_process_structure || "Rien n'est formalisé";
  const q11 = answers.q11_main_problem || 'Je ne génère pas assez de leads';

  const pCommercialVolume = COMMERCIAL_VOLUME_POINTS[q1] ?? 5;
  const pCommercialUrgency = COMMERCIAL_URGENCY_POINTS[q9] ?? 0;
  const pCommercialProblem = COMMERCIAL_PROBLEM_POINTS[q11] ?? 5;
  const pCommercialProcess = COMMERCIAL_PROCESS_POINTS[q10] ?? 10;

  const totalCommercialScore = Math.min(
    100,
    Math.max(
      0,
      pCommercialVolume + pCommercialUrgency + pCommercialProblem + pCommercialProcess
    )
  );

  let commercialPriority: CommercialPriority = 'LOW';
  if (totalCommercialScore >= 76) commercialPriority = 'VERY_HIGH';
  else if (totalCommercialScore >= 51) commercialPriority = 'HIGH';
  else if (totalCommercialScore >= 26) commercialPriority = 'MEDIUM';
  else commercialPriority = 'LOW';

  let specialWarning: string | undefined = undefined;
  if (
    q10.includes('Rien') ||
    q10.includes('Quelques scripts') ||
    q10.includes('Un script')
  ) {
    if (totalSettingScore >= 51) {
      specialWarning =
        "Vos KPI actuels sont corrects, mais l'absence de formalisation avancée rend votre système fortement dépendant de l'humain et difficilement délégable.";
    }
  }

  return {
    score: totalSettingScore,
    level,
    dimensions: dimensionsMap,
    top3Weaknesses,
    top3WeaknessKeys: top3Weaknesses.map((w) => w.key),
    commercialOpportunity: {
      score: totalCommercialScore,
      priority: commercialPriority,
    },
    contextInsights: {
      leadVolumeText: q1,
      leadSourceText: q2,
      urgencyText: q9,
      processText: q10,
      mainProblemText: q11,
      specialWarning,
    },
  };
}
