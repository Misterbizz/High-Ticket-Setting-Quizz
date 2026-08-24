-- ==============================================================================
-- Schema: quiz_leads
-- Description: Stores quiz lead submission data according to High Ticket Setting Qualifier specifications
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
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.quiz_leads ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow public / anonymous users to insert new leads
CREATE POLICY "Allow public insert to quiz_leads"
ON public.quiz_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Policy: Restrict reading (SELECT) to service_role / admins only (blocks anon/public read)
-- By enabling RLS without adding a SELECT policy for anon, public reads are automatically denied.
-- Only authenticated admins or service_role can read the leads.
