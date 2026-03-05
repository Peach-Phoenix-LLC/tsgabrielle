import { getSupabaseServerClient } from "./supabase/server";

export type PageContentMap = Record<string, string>;

export async function getPageContent(pagePath: string): Promise<PageContentMap> {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("page_content")
      .select("content_key, content_value")
      .eq("page_path", pagePath);

    if (error) {
      console.error(`Error fetching content for ${pagePath}:`, error);
      return {};
    }

    const contentMap: PageContentMap = {};
    data.forEach((item) => {
      contentMap[item.content_key] = item.content_value;
    });

    return contentMap;
  } catch (error) {
    console.error(`Unexpected error fetching content for ${pagePath}:`, error);
    return {};
  }
}

export async function getSiteSettings(): Promise<Record<string, string>> {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value");

    if (error) {
      console.error("Error fetching site settings:", error);
      return {};
    }

    const settings: Record<string, string> = {};
    data.forEach((item) => {
      settings[item.key] = item.value;
    });

    return settings;
  } catch (error) {
    console.error("Unexpected error fetching site settings:", error);
    return {};
  }
}

export async function getHeroSlides() {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .eq("active", true)
      .order("sort_order");

    if (error) {
      console.error("Error fetching hero slides:", error);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Unexpected error fetching hero slides:", error);
    return [];
  }
}
