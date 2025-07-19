


import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Pencil } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { IProduct } from "@/@types";
import { formatPrice } from "@/lib/utils";

const updateProductSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  price: z.string().nonempty({ message: "Preço é obrigatório" }),
  SKU: z.string().min(1, { message: "SKU é obrigatório" }),
});

type UpdateProductSchema = z.infer<typeof updateProductSchema>;

export function UpdateProductForm({ data } : { data: IProduct }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: data.name,
      price: formatPrice(data.price),
      SKU: data.SKU,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (newData: UpdateProductSchema) => {
      await api.put(`products/${data.id}`, {
        name: newData.name,
        price: Number(newData.price.replace(",", ".").replace("R$", "").trim()),
        SKU: newData.SKU,
      });
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
      form.reset();
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 400) {
        form.setError("price", {
          message: "O preço deve ser maior que 0"
        })
      }
    },
  });

  function onSubmit(data: UpdateProductSchema) {
    mutate(data);
  };

  /**
   * 
   * @param price valor do preço em string
   * @returns o valor com a moeda formatada Ex: 9999 -> R$ 99,99
   */
  function formatPriceOnChange(price: string): string {
    const priceFormatted = Number(price.replace(/\D/g, ""));
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(priceFormatted / 100);

  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger >
        <Pencil className="w-5 h-5 text-blue-600 cursor-pointer"/>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-5">
            <DialogTitle className="text-lg font-semibold">Atualizar Produto</DialogTitle>
            <DialogDescription>
              Atualize as informações do produto.
            </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="group relative">
                  <FormLabel className="text-xs bg-card px-1 absolute -translate-y-2 translate-x-1 font-semibold">
                    Nome
                  </FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="group relative">
                  <FormLabel className="text-xs bg-card px-1 absolute -translate-y-2 translate-x-1 font-semibold">
                    Preço
                  </FormLabel>
                  <Input value={field.value} onChange={(e) => {
                    field.onChange(formatPriceOnChange(e.target.value));
                  }}/>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="SKU"
              render={({ field }) => (
                <FormItem className="group relative">
                  <FormLabel className="text-xs bg-card px-1 absolute -translate-y-2 translate-x-1 font-semibold">
                    SKU
                  </FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          <div className="flex justify-end mt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="ml-2"
              disabled={isPending}
            >
              {isPending ? "Atualizando..." : "Atualizar Produto"}
            </Button>
          </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
