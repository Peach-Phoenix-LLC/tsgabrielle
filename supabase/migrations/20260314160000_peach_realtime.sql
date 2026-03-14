-- Migration: Enable Realtime for peach_messages
-- 1. Ensure the table is in the realtime publication
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'peach_messages'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.peach_messages;
  END IF;
END $$;

-- 2. Ensure replica identity is FULL to get all columns in events
ALTER TABLE public.peach_messages REPLICA IDENTITY FULL;
