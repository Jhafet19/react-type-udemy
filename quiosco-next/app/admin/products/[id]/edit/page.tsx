import prisma from "@/src/lib/prisma"
import {notFound, redirect} from "next/navigation";
import Heading from "@/components/ui/Heading";
import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import Link from "next/link";
import ProductsSearchForm from "@/components/products/ProductsSearchForm";
import GoBackButton from "@/components/ui/GoBackButton";

async function getProductById(id: number) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })
    return product
}

export default async function EditProductsPage({params}: { params: { id: string } }) {

    const product = await getProductById(+params.id)
    console.log("🚀 ~ EditProductsPage ~ product: ", product);

    if (!product) {
        notFound()
    }
    return (
        <>
            <Heading>Editar Producto: {product.name}</Heading>

            <GoBackButton/>
            <EditProductForm>
                <ProductForm product={product}/>
            </EditProductForm>
        </>
    )
}
