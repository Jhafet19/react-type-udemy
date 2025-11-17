import { getPorjectById } from "@/api/ProjectAPI"
import EditoProjectForm from "@/components/projects/EditoProjectForm"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"

export default function EditProjectView() {

    const param = useParams()
    const projectId = param.projectId!
    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getPorjectById(projectId),
        retry: 1
    })
    if (isLoading) return 'Cargando...'
    if (isError) return <Navigate to={'/404'} />

    if (data) return <EditoProjectForm data={data} projectId={projectId} />

    return (
        <div>

        </div>
    )
}
