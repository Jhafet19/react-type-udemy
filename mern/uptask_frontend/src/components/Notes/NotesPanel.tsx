import AddNoteForm from "@/components/Notes/AddNoteForm.tsx";
import {Task} from "@/types/index.ts";
import NoteDetail from "@/components/Notes/NoteDetail.tsx";

type NotesPanelProps = {
    notes: Task['notes']
}
export default function NotesPanel({notes}: NotesPanelProps) {
    return (
        <>
            <AddNoteForm/>
            <div className="divide-y divide-gray-100 mt-10">
                {notes.length ? (
                    <>
                        <p className='font-bold text-2xl text-slate-600 my-5 '>Notas: </p>
                        {notes.map(note => <NoteDetail key={note._id}  note={note}/>)}
                    </>
                ) : <p className='text-gray-500 text-center pt-3'>No hay notas</p>}
            </div>
        </>

    )
}
