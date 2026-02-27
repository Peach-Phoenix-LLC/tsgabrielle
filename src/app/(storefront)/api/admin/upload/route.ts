import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const customName = formData.get('filename') as string || '';

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Define upload directory
        const uploadDir = join(process.cwd(), 'public', 'uploads');

        // Ensure directory exists
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // Already exists or other error
        }

        // Generate filename
        let filename = customName || file.name;
        // Ensure filename is safe and has extension
        const ext = file.name.split('.').pop();
        if (!filename.includes('.')) {
            filename = `${filename}.${ext}`;
        }

        // To avoid collisions if no custom name, or just to be safe
        const safeName = customName ? filename : `${uuidv4()}-${filename}`;
        const path = join(uploadDir, safeName);

        await writeFile(path, buffer);
        console.log(`File uploaded to ${path}`);

        const url = `/uploads/${safeName}`;
        return NextResponse.json({ url, filename: safeName });
    } catch (error: any) {
        console.error('UPLOAD ERROR:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
