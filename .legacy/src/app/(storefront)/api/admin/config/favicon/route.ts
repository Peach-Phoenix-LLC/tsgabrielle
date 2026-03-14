import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import path from "path";
import fs from "fs/promises";

const ALLOWED_EMAIL = "yridoutt@gmail.com";

async function checkAdmin() {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.email !== ALLOWED_EMAIL) {
        return false;
    }
    return true;
}

export async function POST(req: NextRequest) {
    if (!(await checkAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const form = await req.formData();
        const file = form.get("file") as File;
        if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

        const ext = path.extname(file.name).toLowerCase();
        if (![".ico", ".png", ".svg"].includes(ext)) {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const destPath = path.join(process.cwd(), "public", `favicon${ext}`);
        await fs.writeFile(destPath, buffer);

        const faviconUrl = `/favicon${ext}?v=${Date.now()}`;
        return NextResponse.json({ success: true, faviconUrl });
    } catch (error) {
        console.error("Favicon upload error:", error);
        return NextResponse.json({ error: "Failed to upload favicon" }, { status: 500 });
    }
}
