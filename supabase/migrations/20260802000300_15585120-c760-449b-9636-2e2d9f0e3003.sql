DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions
FOR INSERT
TO anon
WITH CHECK (idempotency_key IS NOT NULL);

ALTER FUNCTION public.set_updated_at() SET search_path = public;