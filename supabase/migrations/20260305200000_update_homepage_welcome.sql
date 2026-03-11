-- Update Homepage Content
INSERT INTO page_content (page_path, content_key, content_type, content_value)
VALUES ('/', 'catalogue_title', 'text', 'Welcome')
ON CONFLICT (page_path, content_key) 
DO UPDATE SET content_value = 'Welcome', updated_at = NOW();
