export type patient = {
    id: string
    name: string
    caretaker: string
    email: string
    date: Date
    symptoms: string
}

export type draftPatient = Omit<patient, 'id'>