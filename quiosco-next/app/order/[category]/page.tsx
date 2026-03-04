import {PrismaClient} from '../../../src/generated/prisma/client'
import {Pool} from 'pg'
import {PrismaPg} from '@prisma/adapter-pg'
import ProductCart from "@/components/products/ProductCart";


const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
    adapter,
})

async function getProducts(category: string) {
    const products = await prisma.product.findMany({
        where: {
            category: {
                slug: category
            }
        }
    })

    return products
}

export default async function OrderPage({params}: { params: { category: string } }) {
    const products = await getProducts(params.category)

    return (
        <>
            <h1 className="text-2xl my-10">Elige y personaliza tu pedido a continuación </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start ">

                {products.map(product => (
                    <ProductCart key={product.id} product={product}/>
                ))}

            </div>

        </>
    )
}
