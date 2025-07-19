import { IProduct } from "@/@types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatDate, formatPrice } from "@/lib/utils";
import { DeleteProductForm } from "../form/delete-product-form";
import { UpdateProductForm } from "../form/update-product-form";

export function TableProducts({ data } : { data?: IProduct[] }) {
  return (
    <section className="bg-card rounded-sm overflow-clip border border-muted-foreground/40">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted-foreground/10">
            <TableHead>ID</TableHead>
            <TableHead>NOME</TableHead>
            <TableHead>PREÇO</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>LETRA AUSENTE</TableHead>
            <TableHead>CRIADO</TableHead>
            <TableHead>ATUALIZADO</TableHead>
            <TableHead className="text-center">AÇÕES</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{formatPrice(product.price)}</TableCell>
                <TableCell>{product.SKU}</TableCell>
                <TableCell>
                  {product.firstMissingLetter.toUpperCase()}
                </TableCell>
                <TableCell>
                  {formatDate(product.createdAt.toLocaleString())}
                </TableCell>
                <TableCell>
                  {formatDate(product.updatedAt.toLocaleString())}
                </TableCell>
                <TableCell align="center" className="space-x-2 w-fit justify-center">
                  <DeleteProductForm id={product.id} />
                  <UpdateProductForm data={product} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </section>
  );
}
