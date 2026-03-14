import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const { searchParams } = new URL(req.url);
    const folder = searchParams.get("folder");
    const search = searchParams.get("search");
    const supabase = getSupabaseServerClient();

    let query = supabase
      .from("media_library")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (folder && folder !== "all") {
      query = query.eq("folder", folder);
    }

    if (search) {
      query = query.or(
        `filename.ilike.%${search}%,alt_text.ilike.%${search}%`
      );
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const supabaseAdmin = getSupabaseAdmin();
    const { error: uploadError } = await supabaseAdmin.storage
      .from("images")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabaseAdmin.storage.from("images").getPublicUrl(filePath);

    // Save to media library
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("media_library")
      .insert({
        filename: file.name,
        url: publicUrl,
        alt_text: file.name.split(".")[0],
        mime_type: file.type,
        file_size: file.size,
        folder,
        uploaded_by: auth.user?.id || null,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error uploading media:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const supabase = getSupabaseServerClient();

    // Get the media item to find the storage path
    const { data: item } = await supabase
      .from("media_library")
      .select("url")
      .eq("id", id)
      .single();

    if (item?.url) {
      // Extract path from URL and delete from storage
      try {
        const url = new URL(item.url);
        const pathParts = url.pathname.split("/storage/v1/object/public/images/");
        if (pathParts[1]) {
          await getSupabaseAdmin().storage
            .from("images")
            .remove([decodeURIComponent(pathParts[1])]);
        }
      } catch {
        // Storage deletion is best-effort
      }
    }

    const { error } = await supabase
      .from("media_library")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
