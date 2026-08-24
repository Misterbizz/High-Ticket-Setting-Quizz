# High Ticket Setting Qualifier

## 1. Project Overview

### Project name

**High Ticket Setting Qualifier**

### Main objective

Créer une landing page contenant un **quiz de diagnostic interactif** destiné aux entrepreneurs.

Le quiz doit permettre d'évaluer la maturité actuelle de leur système de prise de rendez-vous / setting en analysant notamment :

* le volume de leads générés ;
* la provenance des leads ;
* le taux de conversion Lead → Rendez-vous ;
* le show rate ;
* la qualité des rendez-vous ;
* le taux de closing ;
* la vitesse de traitement des leads ;
* le nombre de relances ;
* l'urgence du problème ;
* le niveau de structuration du process ;
* le principal problème rencontré dans le funnel.

À la fin du quiz :

1. L'utilisateur ne voit PAS immédiatement son résultat.
2. Il doit d'abord renseigner :

   * son prénom ;
   * son email ;
   * son téléphone.
3. Les données et le résultat calculé sont enregistrés dans Supabase.
4. L'utilisateur accède ensuite à son diagnostic.
5. Le diagnostic affiche :

   * son score de maturité ;
   * son niveau de maturité Setting ;
   * ses 3 principales fuites ;
   * une recommandation prioritaire.
6. Le résultat se termine par un CTA permettant de réserver un **rendez-vous diagnostic approfondi**.

---

# 2. Tech Stack

Utiliser :

* **Next.js**
* **TypeScript**
* **Tailwind CSS**
* **Supabase**
* **Cloudflare**

Target deployment :

**Cloudflare**

---

# 3. Product Architecture

Le produit possède trois parties logiques principales :

## Vision

Tout ce que voit et utilise l'utilisateur.

## Cortex

Toute la logique métier invisible :

* scoring ;
* détermination du niveau ;
* identification des principales faiblesses ;
* préparation du diagnostic.

## Memory

Persistance des données dans Supabase.

---

# 4. Vision — User Interface

## Landing Page

Créer une landing page avec un Hero contenant :

### Headline

Une promesse liée au diagnostic du système de setting.

### Subheadline

Une courte explication précisant que le quiz permet d'identifier le niveau de maturité du système de prise de rendez-vous et ses principales pertes.

### Quiz block

Le quiz doit être directement visible dans le Hero.

---

# 5. Quiz UX

Le quiz doit fonctionner comme un :

**Multi-step progressive wizard**

Important :

* afficher une seule question à la fois ;
* permettre à l'utilisateur de sélectionner une réponse ;
* passer à l'étape suivante sans recharger la page ;
* afficher une progression ;
* conserver toutes les réponses dans l'état du wizard ;
* permettre un retour à la question précédente ;
* ne jamais perdre les réponses déjà sélectionnées.

Aucune navigation ou réponse ne doit provoquer un full page reload.

---

# 6. Quiz Questions

## Q1 — Volume de leads

**Combien de nouveaux leads génères-tu actuellement par jour ?**

Options :

1. Moins de 15 leads/jour
2. 15 à 30 leads/jour
3. 31 à 50 leads/jour
4. 51 à 100 leads/jour
5. Plus de 100 leads/jour

### Scoring

Cette question ne compte PAS dans le Score de Maturité Setting.

Elle sert uniquement à contextualiser la taille du système.

---

## Q2 — Source des leads

**D'où proviennent principalement tes leads aujourd'hui ?**

Options :

1. 🟢 Recommandations / bouche-à-oreille
2. 🟢 Contenu organique / communauté
3. 🟡 Publicité avec VSL, webinar ou nurturing
4. 🟠 Publicité directe vers formulaire / quiz / prise de RDV
5. 🔴 Prospection outbound : DM, email, LinkedIn…
6. Mix de plusieurs sources

### Scoring

Cette question ne compte PAS directement dans le Score de Maturité Setting.

Elle sert à contextualiser la température des leads et l'interprétation des performances.

---

## Q3 — Booking Rate

**Quel pourcentage de tes leads prend actuellement rendez-vous ?**

Options et scoring :

| Réponse                    | Points |
| -------------------------- | -----: |
| Moins de 10 %              |      0 |
| 10 à 20 %                  |      5 |
| 21 à 30 %                  |     10 |
| 31 à 40 %                  |     17 |
| 41 à 60 %                  |     22 |
| Plus de 60 %               |     25 |
| Je ne connais pas mon taux |      0 |

Maximum : **25 points**

---

## Q4 — Show Rate

**Parmi tes rendez-vous bookés, combien se présentent réellement ?**

Options et scoring :

| Réponse                    | Points |
| -------------------------- | -----: |
| Moins de 50 %              |      0 |
| 50 à 60 %                  |      3 |
| 61 à 70 %                  |      6 |
| 71 à 80 %                  |     10 |
| 81 à 90 %                  |     13 |
| Plus de 90 %               |     15 |
| Je ne connais pas mon taux |      0 |

Maximum : **15 points**

---

## Q5 — Qualification Rate

**Parmi les prospects qui se présentent au rendez-vous, combien sont réellement qualifiés pour ton offre ?**

Options et scoring :

| Réponse                       | Points |
| ----------------------------- | -----: |
| Moins de 20 %                 |      0 |
| 20 à 40 %                     |      3 |
| 41 à 60 %                     |      7 |
| 61 à 75 %                     |     10 |
| 76 à 90 %                     |     13 |
| Plus de 90 %                  |     15 |
| Je ne mesure pas cette donnée |      0 |

Maximum : **15 points**

---

## Q6 — Closing Rate

**Parmi tes rendez-vous qualifiés, combien deviennent clients ?**

Options et scoring :

| Réponse                               | Points |
| ------------------------------------- | -----: |
| Moins de 10 %                         |      0 |
| 10 à 20 %                             |      2 |
| 21 à 30 %                             |      5 |
| 31 à 40 %                             |      7 |
| 41 à 50 %                             |      9 |
| Plus de 50 %                          |     10 |
| Je ne connais pas mon taux de closing |      0 |

Maximum : **10 points**

Le closing possède volontairement un poids inférieur aux autres KPI car il peut également dépendre :

* de l'offre ;
* du prix ;
* du closer ;
* du sales process ;
* du positionnement.

---

## Q7 — Speed-to-lead

**En combien de temps un nouveau lead est-il généralement contacté après avoir laissé ses coordonnées ?**

Options et scoring :

| Réponse                      | Points |
| ---------------------------- | -----: |
| Moins de 5 minutes           |     20 |
| 5 à 15 minutes               |     17 |
| 15 à 60 minutes              |     12 |
| 1 à 4 heures                 |      7 |
| Dans la journée              |      3 |
| Plus de 24 heures            |      0 |
| Il n'y a pas de délai défini |      0 |

Maximum : **20 points**

---

## Q8 — Relances

**Combien de fois relances-tu un lead qui ne répond pas ?**

Options et scoring :

| Réponse                                              | Points |
| ---------------------------------------------------- | -----: |
| 0 relance                                            |      0 |
| 1 à 2 relances                                       |      3 |
| 3 à 5 relances                                       |      8 |
| 6 à 8 relances                                       |     12 |
| 9 relances ou plus                                   |     15 |
| Je n'ai pas de nombre défini / je relance au feeling |      0 |
| Je n'ai pas de process précis                        |      0 |

Maximum : **15 points**

---

# 7. Context Questions

Ces questions sont importantes pour le diagnostic et la qualification commerciale mais ne changent PAS le Score de Maturité Setting.

## Q9 — Urgence

**À quel point améliorer ton système de prise de rendez-vous est-il une priorité aujourd'hui ?**

Options :

1. Ce n'est pas une priorité
2. J'aimerais l'améliorer dans les prochains mois
3. Je cherche actuellement une solution
4. C'est une priorité ce mois-ci
5. C'est l'un de mes principaux blocages actuellement

### Usage

Ne pas ajouter de points au Score de Maturité Setting.

Utiliser cette réponse pour mesurer l'urgence commerciale du lead.

---

## Q10 — Structuration du process

**À quel niveau ton process de setting est-il structuré ?**

Options :

1. Rien n'est formalisé
2. Quelques scripts / templates
3. Un script principal
4. Scripts + séquences de relance
5. Process complet documenté
6. Process documenté + KPI + optimisation régulière

### Usage

Ne pas ajouter de points au Score de Maturité Setting.

Utiliser cette information pour enrichir le diagnostic.

Exemple :

Un prospect peut avoir de bons KPI mais aucun process documenté.

Dans ce cas, préciser que :

> Les performances sont bonnes, mais le système reste dépendant de l'humain et difficile à déléguer ou scaler.

---

## Q11 — Principal problème

**Quel est aujourd'hui ton principal problème avec ton setting ?**

Options :

1. Je ne génère pas assez de leads
2. Mes leads répondent peu
3. Pas assez de leads prennent RDV
4. Trop de no-shows
5. Mes RDV sont mal qualifiés
6. Mes prospects ne closent pas
7. Mon équipe manque de process
8. Je ne sais pas où se situe le problème

### Usage

Ne PAS scorer cette question.

Elle sert à :

* personnaliser le diagnostic ;
* identifier le problème perçu ;
* préparer le futur rendez-vous commercial.

---

# 8. Lead Capture

Après la dernière question, ne PAS afficher immédiatement le score.

Afficher :

## Ton diagnostic est prêt.

Demander obligatoirement :

* **Prénom**
* **Email**
* **Téléphone**

CTA :

**Découvrir mon niveau de maturité**

Au clic :

1. valider les coordonnées ;
2. calculer le résultat ;
3. enregistrer les données dans Supabase ;
4. afficher la page / vue résultat.

---

# 9. Cortex — Setting Maturity Calculation

## Main score

Calculer un :

**Setting Maturity Score**

Score compris entre :

**0 et 100**

Seules Q3, Q4, Q5, Q6, Q7 et Q8 sont incluses.

Répartition :

| Dimension          | Maximum |
| ------------------ | ------: |
| Booking Rate       |      25 |
| Show Rate          |      15 |
| Qualification Rate |      15 |
| Closing Rate       |      10 |
| Speed-to-lead      |      20 |
| Relances           |      15 |
| **TOTAL**          | **100** |

Formula:

```text
setting_maturity_score =
    q3_booking_points
  + q4_show_points
  + q5_qualification_points
  + q6_closing_points
  + q7_speed_to_lead_points
  + q8_follow_up_points
```

Le score doit toujours rester entre :

```text
0 <= setting_maturity_score <= 100
```

---

# 10. Setting Maturity Levels

## Level 1

Score :

**0–25**

Name:

**Setting improvisé**

Description :

Le système repose principalement sur des actions manuelles, irrégulières ou peu mesurées.

Priority:

**Mettre en place les fondamentaux du process.**

---

## Level 2

Score :

**26–50**

Name:

**Setting en construction**

Description :

Certaines bases existent mais plusieurs étapes du funnel provoquent encore des pertes importantes.

Priority:

**Identifier les principales fuites et standardiser le process.**

---

## Level 3

Score :

**51–75**

Name:

**Setting structuré**

Description :

Le système transforme déjà correctement les leads en opportunités commerciales, mais plusieurs optimisations restent possibles.

Priority:

**Optimiser les conversions, automatiser et améliorer les KPI faibles.**

---

## Level 4

Score :

**76–100**

Name:

**Setting scalable**

Description :

Le process est rapide, structuré et performant.

Priority:

**Optimisation avancée, scalabilité et pilotage par les données.**

---

# 11. Unknown KPI Logic

Les réponses suivantes doivent automatiquement produire **0 point** pour la dimension concernée :

* Je ne connais pas mon taux
* Je ne mesure pas cette donnée
* Il n'y a pas de délai défini
* Je n'ai pas de process précis
* Je relance au feeling

Ces réponses sont considérées comme un problème de maturité car le business ne possède pas suffisamment de données ou de process pour piloter son funnel.

Dans le diagnostic, utiliser une formulation du type :

> L'absence de tracking ou de process défini t'empêche actuellement d'identifier précisément où sont perdues les opportunités dans ton funnel.

---

# 12. Weakness Detection

Le résultat ne doit PAS simplement afficher un score.

Identifier automatiquement les **3 dimensions les plus faibles**.

Dimensions possibles :

```text
booking_rate
show_rate
qualification_rate
closing_rate
speed_to_lead
follow_up
```

IMPORTANT :

Ne PAS comparer simplement les points bruts car chaque dimension possède un maximum différent.

Calculer pour chaque dimension :

```text
relative_score = earned_points / maximum_points
```

Exemple :

```text
Booking = 10 / 25 = 40%
Show = 10 / 15 = 66.7%
Closing = 5 / 10 = 50%
```

Trier les dimensions par `relative_score` croissant.

Les trois premières deviennent :

```text
top_3_weaknesses
```

---

# 13. Result Screen

Après la capture du lead, afficher une vue résultat personnalisée.

Elle doit contenir :

## 1. Niveau

Exemple :

**Niveau 2 — Setting en construction**

## 2. Score

Exemple :

**47 / 100**

## 3. Résumé

Une courte explication correspondant au niveau obtenu.

## 4. Principales fuites

Afficher les **3 principales faiblesses détectées**.

Exemple :

* Speed-to-lead
* Relances
* Show rate

Chaque faiblesse doit avoir une courte explication.

## 5. Priorité

Afficher la principale recommandation à travailler.

## 6. Contextualisation

Lorsque cela est pertinent, personnaliser le diagnostic à partir de :

* Q1 : volume de leads ;
* Q2 : source des leads ;
* Q9 : urgence ;
* Q10 : structuration ;
* Q11 : problème déclaré.

Ces réponses ne modifient pas le score Setting.

## 7. CTA

Afficher clairement :

**Réserve ton diagnostic Setting**

Le CTA doit conduire vers la prise d'un rendez-vous diagnostic approfondi.

L'objectif du rendez-vous est d'identifier précisément :

* les pertes présentes dans le funnel ;
* leurs causes ;
* les actions prioritaires ;
* les opportunités d'augmentation du nombre de rendez-vous qualifiés.

---

# 14. Commercial Opportunity / Maturity

Une deuxième métrique interne doit pouvoir être stockée :

```text
commercial_maturity
```

Cette donnée est :

* invisible pour l'utilisateur ;
* distincte du Setting Maturity Score ;
* destinée à aider l'équipe commerciale à prioriser les leads.

IMPORTANT :

Les règles définitives de calcul de `commercial_maturity` ne sont PAS encore définies dans cette version du projet.

Ne PAS inventer arbitrairement une formule.

Pour la V1 :

```text
commercial_maturity = null
```

ou utiliser un champ nullable dans Supabase jusqu'à ce que les règles de scoring commercial soient définies.

---

# 15. Memory — Supabase

Créer une structure permettant d'enregistrer exactement les informations suivantes pour chaque lead :

```text
Prénom
Email
Téléphone
Réponses aux questions
Maturité Setting
Maturité commerciale
```

Recommended internal representation:

```ts
type QuizLead = {
  id: string
  first_name: string
  email: string
  phone: string

  answers: {
    q1_lead_volume: string
    q2_lead_source: string
    q3_booking_rate: string
    q4_show_rate: string
    q5_qualification_rate: string
    q6_closing_rate: string
    q7_speed_to_lead: string
    q8_follow_up: string
    q9_urgency: string
    q10_process_structure: string
    q11_main_problem: string
  }

  setting_maturity_score: number
  setting_maturity_level: number
  setting_maturity_label: string

  top_3_weaknesses: string[]

  commercial_maturity: number | null

  created_at: string
}
```

---

# 16. Recommended Supabase Table

Table:

```text
quiz_leads
```

Recommended columns:

```text
id
first_name
email
phone
answers
setting_maturity_score
setting_maturity_level
setting_maturity_label
top_3_weaknesses
commercial_maturity
created_at
```

Use `JSONB` for:

```text
answers
top_3_weaknesses
```

---

# 17. Data Flow

Expected complete flow:

```text
Landing page
    ↓
Quiz Q1
    ↓
Quiz Q2
    ↓
Quiz Q3
    ↓
Quiz Q4
    ↓
Quiz Q5
    ↓
Quiz Q6
    ↓
Quiz Q7
    ↓
Quiz Q8
    ↓
Quiz Q9
    ↓
Quiz Q10
    ↓
Quiz Q11
    ↓
Lead Capture
    ↓
Calculate Setting Maturity
    ↓
Detect Top 3 Weaknesses
    ↓
Save Lead + Answers + Results to Supabase
    ↓
Display Personalized Result
    ↓
CTA: Book Diagnostic
```

---

# 18. Business Rules

The implementation MUST respect these rules:

1. **Never calculate maturity from lead volume alone.**
2. **Lead source does not directly affect the numerical Setting score.**
3. **Only Q3–Q8 contribute to the Setting score.**
4. **Maximum Setting score = 100.**
5. **Unknown KPI = 0 points for that dimension.**
6. **Q9, Q10 and Q11 are contextual questions only.**
7. **The lead must provide contact information before seeing the result.**
8. **Save the lead and quiz answers to Supabase before displaying the final result.**
9. **Always calculate the three weakest dimensions using relative percentages, not raw points.**
10. **Do not invent the Commercial Maturity scoring algorithm until explicit rules are provided.**
11. **The wizard must work without full page reloads.**
12. **The final result must always contain a CTA toward the diagnostic call.**

---

# 19. V1 Definition of Done

The first version is considered complete when:

* the landing page exists ;
* the Hero contains the quiz ;
* all 11 questions work ;
* the wizard works without reload ;
* previous/next navigation works ;
* answers remain persisted during the quiz ;
* the contact form works ;
* validation works for first name, email and phone ;
* the Setting score is correctly calculated ;
* the correct maturity level is assigned ;
* the three weakest dimensions are calculated ;
* the lead and all quiz data are saved to Supabase ;
* the personalized result is displayed ;
* the CTA toward the diagnostic call is visible and functional ;
* the application can be deployed on Cloudflare.

---

# 20. Important Development Principle

Do not reinterpret or change the business scoring rules without explicit instruction.

The scoring system must be implemented as a deterministic function so that:

**the same answers always produce the same score, level and weaknesses.**

Keep business logic separated from UI components so the scoring system can later be modified without rebuilding the entire quiz.
