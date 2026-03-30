import {Product} from "@/src/generated/prisma/client";
import {formatCurrency, getImagePath} from "@/src/utils";
import Image from "next/image";
import AddProcuctButton from "@/components/products/AddProcuctButton";

type ProductCartProps = {
    product: Product
}

export default function ProductCart({product}: ProductCartProps) {

    const imagePath = getImagePath(product.image)
    return (
        <div className="border bg-white">

            <Image
                width={400}
                height={500}
                src={imagePath} alt={`Imagen platillo ${product.name}`}


            />

            <div className="p-5">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500"> {formatCurrency(product.price)}</p>
                <AddProcuctButton product={product}/>
            </div>

        </div>
    )
}
