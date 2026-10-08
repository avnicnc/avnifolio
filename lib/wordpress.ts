// lib/wordpress.ts

export interface HeroBannerSection {
  acf_fc_layout: "hero_banner";
  banner_title: string;
  banner_description: string;
  button_list?: Array<{
    banner_button: {
      title: string;
      url: string;
      target: string;
    };
  }>;
}

export interface ServicesSection {
  acf_fc_layout: "services";
  service_main_title: string;
  services_description: string;
  services_list?: Array<{
    service_icon: number;
    service_title: string;
    service_subtitle: string;
  }>;
}

export interface ProjectGallerySection {
  acf_fc_layout: "project_gallery";
  gallery_title: string;
  gallery_subtitle: string;
  gallery_button?: {
    title: string;
    url: string;
    target?: string;
  };
}

export interface TestimonialSection {
  acf_fc_layout: "testimonial";
  testimonial_title: string;
  testimonial_list?: Array<{
    quote: string;
    avatar: number;
    author: string;
    role: string;
  }>;
}

export type PageSection =
  | HeroBannerSection
  | ServicesSection
  | ProjectGallerySection
  | TestimonialSection
  | { acf_fc_layout: string; [key: string]: any };

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "http://wpnext.local";

/**
 * Fetches the flexible content sections from the WordPress "home" page
 */
export async function getHomePageSections(): Promise<PageSection[]> {
  try {
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/pages?slug=home`, {
      next: { revalidate: 10 }, // Check for updates every 10 seconds in development
    });

    if (!res.ok) {
      console.warn(`[WordPress] Failed to fetch page: HTTP ${res.status}`);
      return [];
    }

    const pages = await res.json();
    const homePage = pages?.[0];

    return homePage?.acf?.page_section || [];
  } catch (error) {
    console.error("[WordPress] Network or fetch error:", error);
    return [];
  }
}
