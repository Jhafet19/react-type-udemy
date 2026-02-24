import {useForm} from "react-hook-form";
import {NoteFormData} from "@/types/index.ts";
import ErrorMessage from "@/components/ErrorMessage.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createNote} from "@/api/NoteAPI.ts";
import {toast} from "react-toastify";
import {useLocation, useParams} from "react-router-dom";

export default function AddNoteForm() {
    const initalValues: NoteFormData = {
        content: ''
    }
    const {register, handleSubmit, formState: {errors}, reset} = useForm({defaultValues: initalValues})

    const params = useParams()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const projectId = params.projectId!
    const taskId = queryParams.get('viewTask')!

    const queClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: createNote,
        onError: (e) => {
            toast.error(e.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queClient.invalidateQueries({queryKey: ['task', taskId]})
        }
    })
    const handleAddNote = (formData: NoteFormData) => {
        mutate({projectId, taskId, formData})
        reset()


    }
    return (
        <form onSubmit={handleSubmit(handleAddNote)} className='space-y-3' noValidate>
            <div className='flex flex-col gap-2'>
                <label className='font-bold ' htmlFor='content'></label>
                <input type="text" placeholder='Contenido de la nota' className='w-full border border-gray-300'
                       id="content"
                       {...register('content', {
                           required: 'El contenido de la nota es obligatorio'
                       })}
                />

                {errors.content && (
                    <ErrorMessage>{errors.content?.message}</ErrorMessage>
                )}
            </div>

            <input type="submit" value="Crear Nota" className='bg-fuchsia-600 hover:bg-fuchsia-700
             w-full p-2 text-white font-black cursor-pointer '/>
        </form>
    )
}
