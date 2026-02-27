import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { bucket, bucketName } from '@/lib/gcs';

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

        // Generate filename
        let filename = customName || file.name;
        // Ensure filename is safe and has extension
        const ext = file.name.split('.').pop() || '';
        if (!filename.includes('.')) {
            filename = `${filename}.${ext}`;
        }

        // To avoid collisions if no custom name, or just to be safe
        const safeName = customName ? filename : `${uuidv4()}-${filename}`;

        // Ensure there are no spaces in the URL
        const finalName = safeName.replace(/\s+/g, '-');

        const gcsFile = bucket.file(`uploads/${finalName}`);

        await gcsFile.save(buffer, {
            metadata: {
                contentType: file.type,
            }
        });

        const url = `https://storage.googleapis.com/${bucketName}/uploads/${finalName}`;
        return NextResponse.json({ url, filename: finalName });
    } catch (error: any) {
        console.error('UPLOAD ERROR:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
