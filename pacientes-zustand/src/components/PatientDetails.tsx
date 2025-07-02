import { toast } from 'react-toastify'
import { usePatientStore } from '../store'
import type { patient } from '../types'
import PatientDetailITem from './PatientDetailITem'

type PatientDetailsProps = {
    patient: patient
}

export default function PatientDetails({ patient }: PatientDetailsProps) {
    const deletePatient = usePatientStore((state) => state.deletePatient)
    const getpatientById = usePatientStore((state) => state.getpatientById)
    const handleClick = () => {
        deletePatient(patient.id)
        toast.error('Paciente eliminado exitosamente')
    }

    return (
        <div className='mx-5 my-10  px-5 py-10 bg-white shadow-md rounded-xl'>

            <PatientDetailITem label="ID:" data={patient.id} />
            <PatientDetailITem label="Nombre:" data={patient.name} />
            <PatientDetailITem label="Propietario:" data={patient.caretaker} />
            <PatientDetailITem label="Email:" data={patient.email} />
            <PatientDetailITem label="Fecha alta:" data={patient.date.toString()} />

            <PatientDetailITem label="Sintomas:" data={patient.symptoms} />

            <div className="flex  flex-col md:flex-row justify-between gap-3 mt-10">
                <button className='py-2 px-10   bg-indigo-600 hover:bg-indigo-700 text-white font-bold border uppercase rounded-lg'
                    onClick={() => getpatientById(patient.id)}
                >
                    Editar
                </button>
                <button className='py-2 px-10 bg-red-600  hover:bg-red-700 text-white font-bold uppercase rounded-lg'
                    onClick={handleClick}
                >
                    Eliminar
                </button>
            </div>

        </div>
    )
}
