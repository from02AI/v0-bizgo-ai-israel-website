-- Subscribers canonical table for BizGoAI
-- Run this in your Supabase SQL editor (or via psql)
-- Ensure pgcrypto is available for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  -- email stored as provided; uniqueness enforced case-insensitively via index below
  email text NOT NULL,
  -- helper stored lowercase email to allow ON CONFLICT on a real column
  email_lower text GENERATED ALWAYS AS (lower(email)) STORED,
  name text,
  subscribed boolean NOT NULL DEFAULT true,
  consent_ts timestamptz NOT NULL DEFAULT now(),
  consent_source text,
  provider_ids jsonb DEFAULT '{}'::jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  ip inet DEFAULT NULL,
  user_agent text DEFAULT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Case-insensitive unique constraint on email using generated column
ALTER TABLE public.subscribers DROP CONSTRAINT IF EXISTS ux_subscribers_email_lower;
CREATE UNIQUE INDEX IF NOT EXISTS ux_subscribers_email_lower ON public.subscribers (email_lower);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp ON public.subscribers;
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.subscribers
FOR EACH ROW
EXECUTE FUNCTION public.trigger_set_timestamp();
