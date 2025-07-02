import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';
import { bd } from '../db';
import Swal from 'sweetalert2';
export default function ModalAgregarCuenta({ onAgregar, onClose }) {

    const [nombre, setNombre] = useState('')
    const [saldo, setSaldo] = useState('')

    const handleSubmit = async (e) => {

        e.preventDefault()
        console.log("🚀 ~ handleSubmit ~ handleSubmit:", 231)
        console.log("🚀 ~ ModalAgregarCuenta ~ saldo:", saldo)
        console.log("🚀 ~ ModalAgregarCuenta ~ nombre:", nombre)
        if (nombre === '' || saldo === '') return
        const nuevaCuenta = {
            id: uuid(),
            nombre,
            saldo: parseFloat(saldo)
        }
        await bd.cuentas.add(nuevaCuenta)
        onAgregar(nuevaCuenta)

        onClose()

        Swal.fire({                              // 🔔 Mostrar alerta
            icon: 'success',
            title: 'Cuenta agregada',
            text: 'La cuenta se ha guardado correctamente.',
            timer: 2000,
            showConfirmButton: false
        });
        setNombre('')
        setSaldo('')

    }

    return (
        < >
            <dialog id="my_modal_3" className="modal modal-open  sm:modal-middle">
                <div className="modal-box">
                    <form method="dialog " className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={onClose}
                            type='button'
                        >✕</button>
                        <h3 className="font-bold text-lg">Agregar nueva cuenta</h3>
                        <div className='form-control '>
                            <label className="floating-label">
                                <span>Cuenta</span>
                                <input type="text" placeholder="Bancomer, NU" className="input input-md w-full"
                                    pattern='^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,30}$'
                                    title='Solo letras y espacios. Entre 2 y 30 caracteres'
                                    required
                                    onChange={(e) => setNombre(e.target.value)}

                                />
                            </label>
                        </div>

                        <div className="form-control ">
                            <label className="floating-label">
                                <span>Saldo</span>
                                <input type="number" placeholder="1500" className="input iinput-bordered  w-full"
                                    required
                                    pattern='\d'
                                    min="0"
                                    max="1000000"
                                    step="0.01"
                                    onChange={(e) => setSaldo(e.target.value)}
                                />
                            </label>
                        </div>

                        <button className="btn" onClick={onClose} type='button'>Cancelar</button>
                        <button className="btn btn-primary" type='submit'>Guardar nueva cuenta</button>



                    </form>
                </div>
            </dialog>
        </>
    )
}
