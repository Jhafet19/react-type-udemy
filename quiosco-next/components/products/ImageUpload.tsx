"use client"

import {TbPhotoPlus} from "react-icons/tb";
import {CldUploadWidget} from "next-cloudinary";
import {useState} from "react";
import Image from "next/image";

export default function ImageUpload() {
    const [imageUrl, setImageUrl] = useState()

    return (
        <CldUploadWidget uploadPreset={'PresetsQuiosco'}
                         onSuccess={(result, {widget}) => {
                             if (result.event === 'success') {
                                 widget.close()
                                 // @ts-ignore
                                 setImageUrl(result.info.secure_url)
                             }

                         }}
                         options={{maxFiles: 1}}
        >
            {
                ({open}) => (
                    <>
                        <div className="space-y-2">
                            <label className={"text-slate-800"}>Imagen Producto</label>
                            <div
                                onClick={() => open()}
                                className={"relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300" +
                                    "flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"}>
                                <TbPhotoPlus size={50}/>
                                <p className={"text-lg font-semibold"}>Agregar imagen</p>
                                {imageUrl && (
                                    <div className={"absolute inseet-0 w-full h-full"}>
                                        <Image src={imageUrl} alt={'Imagen de producto'} fill
                                               style={{objectFit: 'contain'}}/>
                                    </div>
                                )}
                            </div>
                        </div>
                        <input type={"hidden"} name={"image"} value={imageUrl}/>
                    </>
                )
            }
        </CldUploadWidget>
    )
}
