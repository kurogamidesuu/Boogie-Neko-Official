import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/api";

export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className="flex flex-col gap-10 pb-20">
      <Hero />

      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-5 p-5 ">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.images.url || '/default-product-image.png'}
              altText={product.images.altText || product.title}
              title={product.title}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      </section>
    </div>
  );
}