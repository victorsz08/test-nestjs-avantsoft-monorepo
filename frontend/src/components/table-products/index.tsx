import { IProduct } from "@/@types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Skeleton } from "../ui/skeleton";


export function TableProducts() {
  const { data, isPending } = useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get<IProduct[]>("/products");
      return response.data;
    },
    refetchOnWindowFocus: true,
  });

  if (isPending) {
    return <Skeleton className="w-full h-screen bg-muted"/>
  };

  if(!data || data?.length === 0) {
    return (
      <section className="bg-card rounded-sm overflow-clip border border-muted-foreground/40 p-4">
        <p className="text-muted-foreground">Nenhum produto encontrado.</p>
      </section>
    );
  }

  return (
    <section className="bg-card rounded-sm overflow-clip border border-muted-foreground/40">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>LA</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((product) => (
              <TableRow key={product.id}>
                <TableHead>
                  #{product.firstMissingLetter.toUpperCase()}
                </TableHead>
                <TableHead>{product.name}</TableHead>
                <TableHead>{product.price}</TableHead>
                <TableHead>{product.SKU}</TableHead>
                <TableHead>
                  {new Date(product.createdAt).toLocaleDateString()}
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </section>
  );
}
