-- Create storage policies for images bucket
-- Run this SQL to enable public read/write access to the images bucket

-- Allow public read access to images
CREATE POLICY "Public Read Access" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

-- Allow public insert access to images  
CREATE POLICY "Public Insert Access" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'images');

-- Allow public update access to images
CREATE POLICY "Public Update Access" ON storage.objects
FOR UPDATE USING (bucket_id = 'images');

-- Allow public delete access to images
CREATE POLICY "Public Delete Access" ON storage.objects
FOR DELETE USING (bucket_id = 'images');
