import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/lib/api";

export default async function Home() {
  const products = await fetchProducts();

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Latest Drops 📦</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={`${product.title}-${product.description}-${product.price}`} className="border p-4 rounded-lg shadow-sm">
            <h2 className="font-bold text-xl">{product.title}</h2>
            <p className="text-gray-500">${product.price}</p>
            
            <div className="mt-4">
              <Button>Add to Cart</Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}