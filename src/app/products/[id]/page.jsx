import { getSingleProduct } from "@/actions/server/product";
import ProductDetailsClient from "./ProductDetailsClient";

// Server Component - Generate Metadata
export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getSingleProduct(id);

  return {
    title: product.title,
    description:
      product.description?.slice(0, 160) ||
      "Educational toy designed to help kids learn through play.",

    openGraph: {
      title: product.title,
      description:
        "Fun and educational learning toy for kids. Safe, colorful, and engaging.",
      images: [
        {
          url: product.image || "https://i.ibb.co.com/Ld7J2ZYq/image.png",
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: "Fun and educational learning toy for kids.",
      images: [product.image || "https://i.ibb.co.com/Ld7J2ZYq/image.png"],
    },
  };
}

// Server Component - Main Page
const ProductDetails = async ({ params }) => {
  const { id } = await params;
  const product = await getSingleProduct(id);

  return <ProductDetailsClient product={product} />;
};

export default ProductDetails;
