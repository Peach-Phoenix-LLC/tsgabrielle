import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const bucketURL = "https://storage.googleapis.com/tsgabrielle-media-prod/images/Products/1/";
    const images = [
        "black-glossy-mug-black-11-oz-front-69536cec3d361.jpg",
        "black-glossy-mug-black-11-oz-front-69536cec3f6ab.jpg",
        "black-glossy-mug-black-11-oz-handle-on-left-69536cec3dc15.jpg",
        "black-glossy-mug-black-11-oz-handle-on-left-69536cec3edec.jpg",
        "black-glossy-mug-black-11-oz-handle-on-left-69536cec3ff70.jpg",
        "black-glossy-mug-black-11-oz-handle-on-right-69536cec3c860.jpg",
        "black-glossy-mug-black-11-oz-handle-on-right-69536cec3e4ea.jpg",
        "black-glossy-mug-black-11-oz-handle-on-right-69536cec4081d.jpg",
        "black-glossy-mug-black-15-oz-front-69536cec3d7bb.jpg",
        "black-glossy-mug-black-15-oz-front-69536cec3fb0e.jpg",
        "black-glossy-mug-black-15-oz-handle-on-left-69536cec3e077.jpg",
        "black-glossy-mug-black-15-oz-handle-on-left-69536cec3f251.jpg",
        "black-glossy-mug-black-15-oz-handle-on-left-69536cec403c1.jpg",
        "black-glossy-mug-black-15-oz-handle-on-right-69536cec3cee4.jpg",
        "black-glossy-mug-black-15-oz-handle-on-right-69536cec3e970.jpg",
        "black-glossy-mug-black-15-oz-handle-on-right-69536cec40c79.jpg"
    ].map(name => bucketURL + name);

    const product = await prisma.product.findUnique({
        where: { peach_number: 1 },
        include: { variants: true, gallery_slides: true }
    });

    if (!product) {
        console.error("Product Peach Number 1 not found");
        return;
    }

    // Update product
    await prisma.product.update({
        where: { peach_number: 1 },
        data: {
            media_primary_url: images[0],
            media_primary_alt: "Eiffel Tower Black Glossy Mug 11oz Front",
            media_gallery_urls: images,
            media_gallery_alts: images.map((_, i) => `Mug view ${i + 1}`)
        }
    });

    for (const variant of product.variants) {
        if (variant.size_label.includes('11')) {
            await prisma.productVariant.update({
                where: { id: variant.id },
                data: {
                    image_url: images.find(url => url.includes('11-oz-front')),
                    image_alt: "11 oz Mug Front"
                }
            });
        }
        if (variant.size_label.includes('15')) {
            await prisma.productVariant.update({
                where: { id: variant.id },
                data: {
                    image_url: images.find(url => url.includes('15-oz-front')),
                    image_alt: "15 oz Mug Front"
                }
            });
        }
    }

    for (let i = 0; i < product.gallery_slides.length; i++) {
        const slide = product.gallery_slides[i];
        if (images[i]) {
            await prisma.gallerySlide.update({
                where: { id: slide.id },
                data: {
                    image_url: images[i],
                    image_alt: slide.caption || "Gallery Image"
                }
            });
        }
    }

    console.log("Updated images successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
