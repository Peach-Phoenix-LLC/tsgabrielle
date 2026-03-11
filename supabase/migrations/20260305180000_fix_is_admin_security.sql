-- Fix security: Set search_path for is_admin function
-- This prevents privilege escalation vulnerabilities

ALTER FUNCTION public.is_admin() SET search_path = public;
