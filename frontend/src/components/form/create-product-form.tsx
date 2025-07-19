import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

const createProductSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  price: z.string().nonempty({ message: "Preço é obrigatório" }),
  SKU: z.string().min(1, { message: "SKU é obrigatório" }),
});

type CreateProductSchema = z.infer<typeof createProductSchema>;

export function CreateProductForm() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      price: "",
      SKU: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CreateProductSchema) => {
      await api.post("/products", {
        name: data.name,
        price: Number(data.price.replace(",", ".").replace("R$", "").trim()),
        SKU: data.SKU,
      });
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      if (error.response?.status === 400) {
        error?.response?.data?.errors?.forEach((err: any) => {
          form.setError(err.field, {
            message: err.messages[0],
          });
        });
      } else {
        form.setError("SKU", {
          message: "SKU já cadastrado",
        });
      }
    },
  });

  function onSubmit(data: CreateProductSchema) {
    mutate(data);
  }

  /**
   *
   * @param price valor do preço em string
   * @returns o valor com a moeda formatada Ex: 9999 -> R$ 99,99
   */
  function formatPrice(price: string): string {
    const priceFormatted = Number(price.replace(/\D/g, ""));
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(priceFormatted / 100);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button">
          <Plus />
          <span className="pr-2">Criar Produto</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-5">
          <DialogTitle className="text-lg font-semibold">
            Criar Produto
          </DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para criar um novo produto.
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
                  <Input
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(formatPrice(e.target.value));
                    }}
                  />
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
              <Button type="submit" className="ml-2" disabled={isPending}>
                {isPending ? "Criando..." : "Criar Produto"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
