-- Fix security: Restrict write access to admins for content tables

-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Admin write site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admin write page_content" ON public.page_content;
DROP POLICY IF EXISTS "Admin write hero_slides" ON public.hero_slides;

-- Recreate policies with is_admin() check
CREATE POLICY "Admin write site_settings" 
  ON public.site_settings
  FOR ALL 
  USING (public.is_admin()) 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin write page_content"
  ON public.page_content
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin write hero_slides"
  ON public.hero_slides
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
