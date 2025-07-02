import React, { useEffect, useState } from 'react'
import ModalAgregarCuenta from '../components/ModalAgregarCuenta';
import { bd } from '../db'
import { Link } from "react-router-dom";

export default function Inicio() {
    const [cuentas, setCuentas] = useState([]);

    useEffect(() => {bd.cuentas.toArray().then(setCuentas)}, [])

    const [mostrarModal, setModal] = useState(false)

    const agregarCuenta = (item) => {
        setCuentas([...cuentas, item])
    }
    return (
        < >
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Tus cuentas</h1>
                    <button className="btn btn-primary"
                        onClick={() => setModal(true)}
                    >Agregar cuenta</button>

                    {
                        mostrarModal && (<ModalAgregarCuenta onAgregar={agregarCuenta} onClose={() => setModal(false)} />)
                    }
                </div>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {cuentas.map((cuenta) => (
                        <div key={cuenta.id} className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="card-title">{cuenta.nombre}</h2>
                                <p>Saldo: ${cuenta.saldo.toLocaleString()}</p>
                                <div className="card-actions justify-end">
                                    <Link to={`/cuentas/${cuenta.id}`} className="btn btn-sm btn-outline btn-accent">  Ver detalles</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </ >
    )
}
