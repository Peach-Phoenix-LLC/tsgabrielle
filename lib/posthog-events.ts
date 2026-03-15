import posthog from "posthog-js";

// Product browsing events
export function trackProductViewed(product: {
  id: string;
  title: string;
  price: number;
  category?: string;
  collection?: string;
  image?: string;
}) {
  posthog.capture("product_viewed", {
    product_id: product.id,
    product_title: product.title,
    price: product.price,
    currency: "USD",
    category: product.category,
    collection: product.collection,
    image_url: product.image,
  });
}

export function trackCollectionViewed(collection: {
  slug: string;
  name: string;
  product_count?: number;
}) {
  posthog.capture("collection_viewed", {
    collection_slug: collection.slug,
    collection_name: collection.name,
    product_count: collection.product_count,
  });
}

export function trackCategoryViewed(category: {
  slug: string;
  name: string;
  product_count?: number;
}) {
  posthog.capture("category_viewed", {
    category_slug: category.slug,
    category_name: category.name,
    product_count: category.product_count,
  });
}

// Cart events
export function trackCartViewed(cart: {
  items: { title: string; variantId: string; qty: number; priceCents: number }[];
  totalCents: number;
}) {
  posthog.capture("cart_viewed", {
    item_count: cart.items.length,
    total_value: cart.totalCents / 100,
    currency: "USD",
    product_names: cart.items.map((i) => i.title),
  });
}

export function trackProductRemovedFromCart(item: {
  variantId: string;
  title: string;
  priceCents: number;
}) {
  posthog.capture("product_removed_from_cart", {
    variant_id: item.variantId,
    product_title: item.title,
    price: item.priceCents / 100,
    currency: "USD",
  });
}

// Search
export function trackSearchPerformed(query: string, resultCount?: number) {
  posthog.capture("search_performed", {
    search_query: query,
    result_count: resultCount,
  });
}

// Newsletter
export function trackNewsletterSubscribed(email: string, source?: string) {
  posthog.capture("newsletter_subscribed", {
    source: source || "footer",
  });
}

// Navigation
export function trackMenuOpened(menuGroup: string) {
  posthog.capture("menu_opened", {
    menu_group: menuGroup,
  });
}

export function trackExternalLinkClicked(url: string, platform?: string) {
  posthog.capture("external_link_clicked", {
    url,
    platform,
  });
}

// Builder events (admin only)
export function trackBuilderAction(action: string, details?: Record<string, any>) {
  posthog.capture("builder_action", {
    action,
    ...details,
  });
}
