import { Box } from "lucide-react";
import { CreateProductForm } from "../form/create-product-form";






export function NotFoundProducts() {
    return (
        <section className="w-full h-screen flex items-center justify-center">
            <div className="flex flex-col justify-center items-center text-muted-foreground">
                <Box className="w-24 h-24 mb-5" />
                <h1 className="text-xl font-bold mb-3">Nenhum produto encontrado</h1>
                <CreateProductForm/>
            </div>
        </section>
    )
}