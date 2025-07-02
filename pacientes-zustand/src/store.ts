import { create } from "zustand";
import type { draftPatient, patient } from "./types";
import { v4 as uuidV4 } from "uuid";
import { createJSONStorage, devtools, persist } from "zustand/middleware";



type PatientState = {
    patients: patient[],
    activeId: patient['id'],
    addPatient: (data: draftPatient) => void,
    deletePatient: (id: patient['id']) => void,
    getpatientById: (id: patient['id']) => void,
    updatePatient: (data: draftPatient) => void
}


const createPatient = (patient: draftPatient): patient => {
    return { ...patient, id: uuidV4() }
}

export const usePatientStore = create<PatientState>(
    devtools(
        persist(
            (set) => ({
                patients: [],
                activeId: '',
                addPatient: (data) => {
                    const newPatient = createPatient(data)
                    set((state) => ({
                        patients: [...state.patients, newPatient]
                    }))

                },
                deletePatient: (id) => {

                    set((state) => ({
                        patients: state.patients.filter((patient) => patient.id !== id)
                    }))
                },
                getpatientById: (id) => {
                    console.log(id);
                    set(() => ({
                        activeId: id
                    }))
                },
                updatePatient: (data) => {
                    set((state) => ({
                        patients: state.patients.map((patient) => patient.id === state.activeId ? { id: state.activeId, ...data } : patient),
                        activeId: ''
                    }))
                }
            }),
            {
                name: 'patient-storage',
                
            })
    ))