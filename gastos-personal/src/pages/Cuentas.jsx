import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { bd } from '../db'
import { PlusCircle, MinusCircle } from 'react-feather';
import ModalAgregarIngreso from '../components/ModalAgregarIngreso';

export default function Cuentas() {

    const { id } = useParams()
    const navigate = useNavigate()
    const [cuenta, setCuenta] = useState(null)
    const [modal, setModal] = useState(false)
    const [movimientos, setMovimientos] = useState([])

    useEffect(() => {
        console.log("🚀 ~ bd.Cuentas.get ~ bd:", bd)

        bd.cuentas.get(id).then((data) => {
            if (!data) {
                navigate("/")
            } else {
                setCuenta(data)
            }
        })
    }, [id, navigate])

    useEffect(() => {
        bd.movimientos.where('cuentaId').equals(id).toArray().then(setMovimientos)
    }, [id])

    if (!cuenta) return <div className="p-6">Cargando cuenta...</div>;

    return (
        < >
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-2">{cuenta.nombre}</h1>
                <p className="text-lg mb-6">Saldo actual: ${cuenta.saldo.toLocaleString()}</p>

                <div className="flex flex-wrap gap-4 mb-8">
                    <button className="btn btn-success flex-1 sm:flex-none"
                        onClick={() => setModal(true)}
                    >

                        <PlusCircle size={10} /> Ingreso
                    </button>
                    console.log("🚀 ~ bd.cuentas.get ~ data:", data)
                    {modal && <ModalAgregarIngreso onClose={() => setModal(false)} idCuenta={id} />}

                    <button className="btn btn-error flex-1 sm:flex-none">
                        <MinusCircle size={18} /> Gasto
                    </button>   
                </div>

                <div className="bg-base-100 p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-2">Movimientos recientes</h2>
                    <p className="text-gray-500">Aún no hay ingresos ni gastos.</p>
                </div>
            </div>

        </>
    )
}
