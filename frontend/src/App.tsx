import { CreateProductForm } from "./components/form/create-product-form"
import { TableProducts } from "./components/table-products"

function App() {
  

    return (
        <main className='bg-backgound flex flex-col p-16 h-screen w-screen'>
            <section className='space-y-0 mb-4'>
                <h1 className='text-2xl font-bold text-foreground/80'>Produtos</h1>
                <p className="text-muted-foreground text-sm">Lista de produtos cadastrados</p>
            </section>
            <section className='mb-4 w-full flex justify-end'>
                <CreateProductForm />
            </section>
            <TableProducts/>
        </main>
    )
}

export default App
