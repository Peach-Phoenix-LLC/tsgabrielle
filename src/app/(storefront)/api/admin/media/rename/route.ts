import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { renameFile, bucketName } from "@/lib/gcs";

const ADMIN_EMAILS = ["yridoutt@gmail.com", "peachphoenixllc@gmail.com"];

async function checkAdmin() {
    if (process.env.NODE_ENV === 'development') return true;
    const session = await getServerSession(authOptions);
    if (!session?.user) return false;
    return (session.user as any).role === 'ADMIN' || ADMIN_EMAILS.includes(session.user.email!);
}

export async function POST(req: NextRequest) {
    if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { oldName, newName } = await req.json();

        if (!oldName || !newName) {
            return NextResponse.json({ error: "Old and New names required" }, { status: 400 });
        }

        const success = await renameFile(oldName, newName);
        if (success) {
            const newUrl = `https://storage.googleapis.com/${bucketName}/${newName}`;
            return NextResponse.json({ success: true, url: newUrl });
        } else {
            return NextResponse.json({ error: "Failed to rename file in Cloud Storage" }, { status: 500 });
        }
    } catch (error: any) {
        console.error("GCS Rename Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
