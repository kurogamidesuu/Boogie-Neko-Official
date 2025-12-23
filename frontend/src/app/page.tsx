import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/api";

export default async function Home() {
  const products = await fetchProducts();

  return (
    <main className="container mx-auto py-10 px-3">
      
      <hr />
      
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
    </main>
  );
}