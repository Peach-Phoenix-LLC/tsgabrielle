-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "full_name" TEXT,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "global_settings" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "global_settings_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "peach_number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "brand" TEXT NOT NULL DEFAULT 'tsgabrielle®',
    "short_description" TEXT NOT NULL,
    "long_description" TEXT NOT NULL,
    "base_sku" TEXT NOT NULL,
    "base_mpn" TEXT NOT NULL,
    "base_gtin" TEXT,
    "product_type" TEXT NOT NULL,
    "catalogue_category" TEXT NOT NULL,
    "catalogue_collection" TEXT NOT NULL,
    "google_category_id" TEXT NOT NULL,
    "google_category_name" TEXT NOT NULL,
    "gs_condition" TEXT NOT NULL DEFAULT 'New',
    "gs_availability" TEXT NOT NULL DEFAULT 'In Stock',
    "gs_gender" TEXT,
    "gs_age_group" TEXT,
    "gs_size_system" TEXT,
    "seo_meta_title" TEXT NOT NULL,
    "seo_meta_description" TEXT NOT NULL,
    "seo_tags" TEXT[],
    "hs_code_primary" TEXT NOT NULL,
    "hs_code_alt" TEXT,
    "shipping_tier" TEXT NOT NULL,
    "lead_time" TEXT NOT NULL,
    "warehouse_zone" TEXT NOT NULL,
    "country_of_origin" TEXT NOT NULL,
    "certifications" TEXT[],
    "traceability" TEXT NOT NULL,
    "ethical_audit" TEXT NOT NULL,
    "carbon_footprint" TEXT NOT NULL,
    "msrp_display" TEXT NOT NULL,
    "map_policy" TEXT,
    "wholesale_price" TEXT,
    "seasonality_code" TEXT,
    "landed_cost_est" TEXT,
    "url_amazon" TEXT,
    "url_etsy" TEXT,
    "url_tiktok" TEXT,
    "composition" TEXT NOT NULL,
    "finish" TEXT NOT NULL,
    "care_instructions" TEXT NOT NULL,
    "prop65_status" TEXT NOT NULL,
    "trademark_notes" TEXT NOT NULL,
    "safety_testing" TEXT NOT NULL,
    "warranty_info" TEXT NOT NULL,
    "contact_info" TEXT NOT NULL,
    "media_primary_url" TEXT,
    "media_gallery_urls" TEXT[],
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_variants" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "size_label" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "variant_sku" TEXT NOT NULL,
    "variant_mpn" TEXT NOT NULL,
    "variant_gtin" TEXT,
    "height" TEXT NOT NULL,
    "diameter" TEXT NOT NULL,
    "dim_weight" TEXT,
    "msrp" TEXT NOT NULL,
    "inventory" TEXT NOT NULL DEFAULT 'In Stock',
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "product_variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_pillars" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "sort_order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "product_pillars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallery_slides" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "sort_order" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "sub_caption" TEXT NOT NULL,
    "accent_color" TEXT NOT NULL,
    "image_url" TEXT,
    "bg_gradient" TEXT,

    CONSTRAINT "gallery_slides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_metafields" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "product_metafields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "total_amount" DECIMAL(10,2) NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "paypal_order_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "order_id" UUID NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishlist_items" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wishlist_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "products_peach_number_key" ON "products"("peach_number");

-- CreateIndex
CREATE UNIQUE INDEX "products_base_sku_key" ON "products"("base_sku");

-- CreateIndex
CREATE UNIQUE INDEX "products_base_mpn_key" ON "products"("base_mpn");

-- CreateIndex
CREATE UNIQUE INDEX "product_variants_variant_sku_key" ON "product_variants"("variant_sku");

-- CreateIndex
CREATE UNIQUE INDEX "product_variants_variant_mpn_key" ON "product_variants"("variant_mpn");

-- CreateIndex
CREATE UNIQUE INDEX "orders_paypal_order_id_key" ON "orders"("paypal_order_id");

-- CreateIndex
CREATE UNIQUE INDEX "wishlist_items_user_id_product_id_key" ON "wishlist_items"("user_id", "product_id");

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_pillars" ADD CONSTRAINT "product_pillars_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery_slides" ADD CONSTRAINT "gallery_slides_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_metafields" ADD CONSTRAINT "product_metafields_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist_items" ADD CONSTRAINT "wishlist_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist_items" ADD CONSTRAINT "wishlist_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
