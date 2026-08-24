export interface QuizOption {
  label: string;
  sublabel?: string;
  badge?: string;
  icon?: string;
}

export interface QuizQuestionConfig {
  id: string;
  key: string;
  stepNumber: number;
  category: 'Volume & Source' | 'Performance & KPI' | 'Opérations & Urgence';
  title: string;
  subtitle?: string;
  options: QuizOption[];
  hasScoringImpact: boolean;
}

export const QUIZ_QUESTIONS: QuizQuestionConfig[] = [
  {
    id: 'q1',
    key: 'q1_lead_volume',
    stepNumber: 1,
    category: 'Volume & Source',
    title: 'Combien de nouveaux leads génères-tu actuellement par jour ?',
    subtitle: 'Permet de calibrer léchelle et la charge opérationnelle de votre pipeline.',
    hasScoringImpact: false,
    options: [
      { label: 'Moins de 15 leads/jour', sublabel: 'Phase de démarrage ou flux restreint' },
      { label: '15 à 30 leads/jour', sublabel: 'Volume modéré et régulier' },
      { label: '31 à 50 leads/jour', sublabel: 'Volume actif en phase de montée en charge' },
      { label: '51 à 100 leads/jour', sublabel: 'Volume élevé nécessitant une équipe' },
      { label: 'Plus de 100 leads/jour', sublabel: 'Volume industriel / mass acquisition' },
    ],
  },
  {
    id: 'q2',
    key: 'q2_lead_source',
    stepNumber: 2,
    category: 'Volume & Source',
    title: "D'où proviennent principalement tes leads aujourd'hui ?",
    subtitle: 'Définit la température moyenne et le niveau déducation de vos prospects.',
    hasScoringImpact: false,
    options: [
      { label: '🟢 Recommandations / bouche-à-oreille', sublabel: 'Trafic ultra-chaud et affinitaire' },
      { label: '🟢 Contenu organique / communauté', sublabel: 'Audience engagée et sensibilisée' },
      { label: '🟡 Publicité avec VSL, webinar ou nurturing', sublabel: 'Trafic tiède pré-qualifié' },
      { label: '🟠 Publicité directe vers formulaire / quiz / prise de RDV', sublabel: 'Trafic froid direct' },
      { label: '🔴 Prospection outbound : DM, email, LinkedIn…', sublabel: 'Prise de contact directe et proactive' },
      { label: 'Mix de plusieurs sources', sublabel: 'Canaux d acquisition diversifiés' },
    ],
  },
  {
    id: 'q3',
    key: 'q3_booking_rate',
    stepNumber: 3,
    category: 'Performance & KPI',
    title: 'Quel pourcentage de tes leads prend actuellement rendez-vous ?',
    subtitle: 'Ratio entre le nombre total de leads générés et le nombre d appels positionnés.',
    hasScoringImpact: true,
    options: [
      { label: 'Moins de 10 %', sublabel: 'Forte déperdition au premier contact' },
      { label: '10 à 20 %', sublabel: 'Moyenne basse standard' },
      { label: '21 à 30 %', sublabel: 'Bonne réactivité' },
      { label: '31 à 40 %', sublabel: 'Très bon engagement conversationnel' },
      { label: '41 à 60 %', sublabel: 'Performance supérieure' },
      { label: 'Plus de 60 %', sublabel: 'Excellent taux de conversion' },
      { label: 'Je ne connais pas mon taux', sublabel: 'Métrique non traquée' },
    ],
  },
  {
    id: 'q4',
    key: 'q4_show_rate',
    stepNumber: 4,
    category: 'Performance & KPI',
    title: 'Parmi tes rendez-vous bookés, combien se présentent réellement ?',
    subtitle: 'Taux de présence effectif en appel commercial (Show Rate).',
    hasScoringImpact: true,
    options: [
      { label: 'Moins de 50 %', sublabel: 'Plus d 1 rendez-vous sur 2 manqué' },
      { label: '50 à 60 %', sublabel: 'No-show élevé freinant la croissance' },
      { label: '61 à 70 %', sublabel: 'Taux de présence modéré' },
      { label: '71 à 80 %', sublabel: 'Bon niveau d engagement' },
      { label: '81 à 90 %', sublabel: 'Rendez-vous très engagés' },
      { label: 'Plus de 90 %', sublabel: 'Taux d assiduité exceptionnel' },
      { label: 'Je ne connais pas mon taux', sublabel: 'Métrique non traquée' },
    ],
  },
  {
    id: 'q5',
    key: 'q5_qualification_rate',
    stepNumber: 5,
    category: 'Performance & KPI',
    title: 'Parmi les prospects qui se présentent au rendez-vous, combien sont réellement qualifiés pour ton offre ?',
    subtitle: 'Critères : budget disponible, décisionnaire, besoin réel immédiat.',
    hasScoringImpact: true,
    options: [
      { label: 'Moins de 20 %', sublabel: 'Grande majorité hors-cible' },
      { label: '20 à 40 %', sublabel: 'Filtre de pré-qualification insuffisant' },
      { label: '41 à 60 %', sublabel: 'Qualité moyenne' },
      { label: '61 à 75 %', sublabel: 'Bonne sélection en amont' },
      { label: '76 à 90 %', sublabel: 'Très haute pertinence des profils' },
      { label: 'Plus de 90 %', sublabel: 'Ciblage chirurgical' },
      { label: 'Je ne mesure pas cette donnée', sublabel: 'Critères non objectivés' },
    ],
  },
  {
    id: 'q6',
    key: 'q6_closing_rate',
    stepNumber: 6,
    category: 'Performance & KPI',
    title: 'Parmi tes rendez-vous qualifiés, combien deviennent clients ?',
    subtitle: 'Taux de transformation final sur opportunités qualifiées.',
    hasScoringImpact: true,
    options: [
      { label: 'Moins de 10 %', sublabel: 'Difficulté à signer' },
      { label: '10 à 20 %', sublabel: 'Taux standard bas' },
      { label: '21 à 30 %', sublabel: 'Performance solide' },
      { label: '31 à 40 %', sublabel: 'Très bonne efficacité commerciale' },
      { label: '41 à 50 %', sublabel: 'Excellente conversion' },
      { label: 'Plus de 50 %', sublabel: 'Offre irrésistible & closing d élite' },
      { label: 'Je ne connais pas mon taux de closing', sublabel: 'Métrique non traquée' },
    ],
  },
  {
    id: 'q7',
    key: 'q7_speed_to_lead',
    stepNumber: 7,
    category: 'Opérations & Urgence',
    title: 'En combien de temps un nouveau lead est-il généralement contacté après avoir laissé ses coordonnées ?',
    subtitle: 'Délai d intervention du premier appel ou message.',
    hasScoringImpact: true,
    options: [
      { label: 'Moins de 5 minutes', sublabel: 'Intervention instantanée (Or)' },
      { label: '5 à 15 minutes', sublabel: 'Réactivité optimale' },
      { label: '15 à 60 minutes', sublabel: 'Bonne réactivité' },
      { label: '1 à 4 heures', sublabel: 'Délai modéré' },
      { label: 'Dans la journée', sublabel: 'Refroidissement du lead' },
      { label: 'Plus de 24 heures', sublabel: 'Perte probable de l attention' },
      { label: "Il n'y a pas de délai défini", sublabel: 'Pas de process de réactivité' },
    ],
  },
  {
    id: 'q8',
    key: 'q8_follow_up',
    stepNumber: 8,
    category: 'Opérations & Urgence',
    title: 'Combien de fois relances-tu un lead qui ne répond pas ?',
    subtitle: 'Cadence de points de contact structurés sur les prospects inactifs.',
    hasScoringImpact: true,
    options: [
      { label: '0 relance', sublabel: 'Pas de relance effectuée' },
      { label: '1 à 2 relances', sublabel: 'Abandon rapide' },
      { label: '3 à 5 relances', sublabel: 'Persévérance intermédiaire' },
      { label: '6 à 8 relances', sublabel: 'Protocole structuré et persistant' },
      { label: '9 relances ou plus', sublabel: 'Intensité maximale et maximisation du ROI' },
      { label: "Je n'ai pas de nombre défini / je relance au feeling", sublabel: 'Informel' },
      { label: "Je n'ai pas de process précis", sublabel: 'Pas de structure' },
    ],
  },
  {
    id: 'q9',
    key: 'q9_urgency',
    stepNumber: 9,
    category: 'Opérations & Urgence',
    title: 'À quel point améliorer ton système de prise de rendez-vous est-il une priorité aujourd’hui ?',
    subtitle: 'Niveau d urgence stratégique pour votre croissance.',
    hasScoringImpact: false,
    options: [
      { label: "Ce n'est pas une priorité", sublabel: 'Projet secondaire' },
      { label: "J'aimerais l'améliorer dans les prochains mois", sublabel: 'Horizon moyen terme' },
      { label: 'Je cherche actuellement une solution', sublabel: 'Recherche active' },
      { label: "C'est une priorité ce mois-ci", sublabel: 'Objectif immédiat' },
      { label: "C'est l'un de mes principaux blocages actuellement", sublabel: 'Goulot d étranglement critique' },
    ],
  },
  {
    id: 'q10',
    key: 'q10_process_structure',
    stepNumber: 10,
    category: 'Opérations & Urgence',
    title: 'À quel niveau ton process de setting est-il structuré ?',
    subtitle: 'Formalisation documentaire, standardisation et délégabilité.',
    hasScoringImpact: false,
    options: [
      { label: "Rien n'est formalisé", sublabel: '100% improvisation' },
      { label: 'Quelques scripts / templates', sublabel: 'Bribes de messages sauvegardés' },
      { label: 'Un script principal', sublabel: 'Trame unique non détaillée' },
      { label: 'Scripts + séquences de relance', sublabel: 'Guides écrits avec relances' },
      { label: 'Process complet documenté', sublabel: 'SOPs complètes, objections, qualification' },
      { label: 'Process documenté + KPI + optimisation régulière', sublabel: 'Système d élite avec data review' },
    ],
  },
  {
    id: 'q11',
    key: 'q11_main_problem',
    stepNumber: 11,
    category: 'Opérations & Urgence',
    title: 'Quel est aujourd’hui ton principal problème avec ton setting ?',
    subtitle: 'Votre point de friction ressenti le plus pénalisant.',
    hasScoringImpact: false,
    options: [
      { label: 'Je ne génère pas assez de leads', sublabel: 'Volume amont insuffisant' },
      { label: 'Mes leads répondent peu', sublabel: 'Manque d accroche ou de réactivité' },
      { label: 'Pas assez de leads prennent RDV', sublabel: 'Difficulté à convertir la discussion' },
      { label: 'Trop de no-shows', sublabel: 'Absences répétées en appel' },
      { label: 'Mes RDV sont mal qualifiés', sublabel: 'Mauvais profils, pas de budget' },
      { label: 'Mes prospects ne closent pas', sublabel: 'Blocage à la signature finale' },
      { label: 'Mon équipe manque de process', sublabel: 'Exécution hétérogène et fragile' },
      { label: 'Je ne sais pas où se situe le problème', sublabel: 'Manque de visibilité globale' },
    ],
  },
];
