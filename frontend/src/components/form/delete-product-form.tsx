import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { XCircle } from "lucide-react";
import { Button } from "../ui/button";





export function DeleteProductForm({ id }: { id: number }) {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            await api.delete(`/products/${id}`);
            return;
        },
        mutationKey: ["delete-product", id],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            setOpen(false);
        }
    });

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger>
                <XCircle className="w-5 h-5 text-destructive cursor-pointer"/>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Excluir Produto</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-center items-center space-x-2">
                    <AlertDialogCancel asChild>
                        <Button type="button" variant="outline">
                            Cancelar
                        </Button>
                    </AlertDialogCancel>
                    <Button
                        type="button"
                        variant="destructive"
                        disabled={isPending}
                        onClick={() => mutate()}
                    >
                        {isPending ? "Excluindo..." : "Excluir"}
                    </Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}