"use client"

import ProductForm from "@/components/products/ProductForm";

export default function AddProductForm({children}: { children: React.ReactNode }) {

    const handleSubmit = async (formData: FormData) => {
        console.log("🚀 ~ AddProductForm ~ handleSubmit: ");

    }
    return (
        <div className={"bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto"}>

            <form action={handleSubmit} className={"space-y-5"}>

                {children}

                <input type="submit" name="" id="" value={"Regsitrar Producto"}
                       className={"bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase cursor-pointer"}/>
            </form>
        </div>
    )
}
