import { useQuery } from "@tanstack/react-query";
import { CreateProductForm } from "./components/form/create-product-form";
import { TableProducts } from "./components/table-products";
import { IProduct } from "./@types";
import { api } from "./lib/api";
import { NotFoundProducts } from "./components/table-products/not-found-products";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  const { data: products, isPending } = useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get<IProduct[]>("/products");
      return response.data;
    },
  });

  if (isPending) {
    return <Skeleton className="bg-muted-foreground/50 w-full h-screen" />;
  }
  return (
    <main className="bg-backgound flex flex-col p-32 h-screen w-screen">
      <section className="space-y-0 mb-4">
        <h1 className="text-2xl font-bold text-foreground/80">Produtos</h1>
        <p className="text-muted-foreground text-sm font-light">
          Lista de produtos cadastrados
        </p>
      </section>
      {products && products.length > 0 ? (
        <>
          <section className="mb-4 w-full flex justify-end">
            <CreateProductForm />
          </section>
          <TableProducts data={products} />
        </>
      ) : (
        <NotFoundProducts />
      )}
    </main>
  );
}

export default App;
