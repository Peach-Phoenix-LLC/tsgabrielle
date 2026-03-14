import { getSupabaseServerClient } from "./supabase/server";
import { PageLayout } from "./types";

export type PageContentMap = Record<string, string>;

export async function getPageLayout(pagePath: string): Promise<PageLayout | null> {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("page_layouts")
      .select("*")
      .eq("page_path", pagePath)
      .maybeSingle();

    if (error) {
      console.error(`Error fetching layout for ${pagePath}:`, error);
      return null;
    }

    if (data) {
      return {
        page_path: data.page_path,
        sections: data.sections,
        theme_overrides: data.theme_overrides
      };
    }

    return null;
  } catch (error) {
    console.error(`Unexpected error fetching layout for ${pagePath}:`, error);
    return null;
  }
}

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
