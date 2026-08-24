-- ==============================================================================
-- Schema: quiz_leads (Updated with commercial_priority)
-- ==============================================================================

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.quiz_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    answers JSONB NOT NULL DEFAULT '{}'::jsonb,
    setting_maturity_score NUMERIC NOT NULL,
    setting_maturity_level INTEGER NOT NULL,
    setting_maturity_label TEXT NOT NULL,
    top_3_weaknesses JSONB NOT NULL DEFAULT '[]'::jsonb,
    commercial_maturity NUMERIC DEFAULT NULL,
    commercial_priority TEXT DEFAULT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Si la table existe déjà, ajouter la colonne commercial_priority si nécessaire
ALTER TABLE public.quiz_leads ADD COLUMN IF NOT EXISTS commercial_priority TEXT DEFAULT NULL;

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.quiz_leads ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow public / anonymous users to insert new leads
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'quiz_leads' AND policyname = 'Allow public insert to quiz_leads'
    ) THEN
        CREATE POLICY "Allow public insert to quiz_leads"
        ON public.quiz_leads
        FOR INSERT
        TO anon, authenticated
        WITH CHECK (true);
    END IF;
END
$$;
