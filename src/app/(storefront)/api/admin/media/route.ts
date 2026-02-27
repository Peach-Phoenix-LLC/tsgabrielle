import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { bucket, bucketName } from "@/lib/gcs";

const ALLOWED_EMAIL = "yridoutt@gmail.com";

async function checkAdmin() {
    if (process.env.NODE_ENV === 'development') return true;
    const session = await getServerSession(authOptions);
    return session?.user?.email === ALLOWED_EMAIL;
}

export async function GET(req: NextRequest) {
    if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const [files] = await bucket.getFiles({ prefix: 'uploads/' });

        const media = files.map(file => {
            return {
                name: file.name.replace('uploads/', ''),
                url: `https://storage.googleapis.com/${bucketName}/${file.name}`,
                size: file.metadata.size,
                created: file.metadata.timeCreated,
            };
        }).filter(m => m.name !== ''); // exclude directory itself if present

        // Return latest first
        media.sort((a: any, b: any) => new Date(b.created).getTime() - new Date(a.created).getTime());

        return NextResponse.json(media);
    } catch (error) {
        console.error("GCS fetching error:", error);
        return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const filename = searchParams.get('filename');

        if (!filename) {
            return NextResponse.json({ error: "Filename required" }, { status: 400 });
        }

        const file = bucket.file(`uploads/${filename}`);
        await file.delete();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("GCS delete error:", error);
        return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
    }
}
