import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid';
import { bd } from '../db';
import Swal from 'sweetalert2';
import "cally";
export default function ModalAgregarIngreso({ onClose, idCuenta }) {

    const [categorias, setCategorias] = useState([]);
    const [fecha, setFecha] = useState('');
    const calendarRef = useRef(null);
    const buttonRef = useRef(null);
    const [categoriaId, setCategoriaId] = useState('');
    const [monto, setMonto] = useState(0);
    const [descripcion, setDescripcion] = useState('')


    useEffect(() => {
        const calendario = calendarRef.current;

        const handleChange = (e) => {
            setFecha(e.target.value);
            if (buttonRef.current) {
                buttonRef.current.innerText = e.target.value;
            }
        };

        if (calendario) {
            calendario.addEventListener("change", handleChange);
        }

        return () => {
            if (calendario) {
                calendario.removeEventListener("change", handleChange);
            }
        };
    }, []);

    useEffect(() => {
        bd.categorias
            .where("tipo")
            .equals("ingreso")
            .toArray()
            .then(setCategorias);

    }, []);



    const handleSubmit = async (e) => {

        e.preventDefault()
        if (monto === '' || descripcion === '' || fecha === '' || categoriaId === '') {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor llena todos los campos antes de guardar.'
            });
            return
        }
        const nuevoMovimiento = {
            id: uuid(),
            cuentaId: idCuenta,
            tipo: 'ingreso',
            monto: parseFloat(monto),
            descripcion: descripcion,
            fecha: fecha,
            categoriaId: categoriaId

        }
        await bd.movimientos.add(nuevoMovimiento)

        const cuenta = await bd.cuentas.get(idCuenta);
        await bd.cuentas.update(idCuenta, {
            saldo: cuenta.saldo + parseFloat(monto)
        });

        onClose()

        Swal.fire({
            icon: 'success',
            title: 'Ingreso  agregado',
            text: 'La cuenta se ha actualizado correctamente.',
            timer: 2000,
            showConfirmButton: false
        });

        setMonto(0);
        setDescripcion('');
        setFecha('');
        setCategoriaId('');

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
                        <h3 className="font-bold text-lg">Agregar nuevo Ingreso</h3>
                        <div className='form-control '>
                            <label className="floating-label">
                                <span>Descripción</span>
                                <input type="text" placeholder="Descripción" className="input input-md w-full"
                                    pattern='^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,30}$'
                                    title='Solo letras y espacios. Entre 2 y 30 caracteres'
                                    required
                                    onChange={(e) => setDescripcion(e.target.value)}

                                />
                            </label>
                        </div>

                        <div className="form-control ">
                            <label className="floating-label">
                                <span>Monto</span>
                                <input type="number" placeholder="Monto ej. 1500" className="input input-bordered  w-full"
                                    required
                                    pattern='\d'
                                    min="0"
                                    max="1000000"
                                    step="0.01"
                                    onChange={(e) => setMonto(e.target.value)}
                                />
                            </label>
                        </div>

                        <button ref={buttonRef} popoverTarget="cally-popover1" className="input input-bordered w-full" id="cally1"
                            style={{ anchorName: '--cally1' }} type="button"
                        >
                            {fecha || "Fecha"}
                        </button>

                        <div popover="" id="cally-popover1" className="dropdown bg-base-100 rounded-box shadow-lg w-" style={{ positionAnchor: '--cally1' }}>
                            <calendar-date class="cally" ref={calendarRef}>
                                <svg aria-label="Previous" className="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
                                </svg>
                                <svg aria-label="Next" className="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
                                </svg>
                                <calendar-month></calendar-month>
                            </calendar-date>
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Categoría</span>
                            </label>
                            <select
                                className="select select-bordered w-full"
                                required
                                value={categoriaId}
                                onChange={(e) => setCategoriaId(e.target.value)}
                            >
                                <option value="">Selecciona una categoría</option>
                                {categorias.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <button className="btn" onClick={onClose} type='button'>Cancelar</button>
                        <button className="btn btn-primary" type='submit' >Guardar nueva cuenta</button>



                    </form>
                </div>
            </dialog>
        </>
    )
}
