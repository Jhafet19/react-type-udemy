import api from "@/lib/axios";
import { dashboardProjectSchema, Project, ProjectFormaData } from "@/types/index";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormaData) {
    console.log("🚀 ~ createProject ~ data:", formData)
    try {
        const { data } = await api.post('/projects/', formData)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log("🚀 ~ createProject ~ error:", error.response.data.error)
            throw new Error(error.response.data.error)
        }


    }
}


export async function getProjects() {
    try {
        const { data } = await api('/projects' )
        const respose = dashboardProjectSchema.safeParse(data)
        if (respose.success) {
            return respose.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log("🚀 ~ createProject ~ error:", error.response.data.error)
            throw new Error(error.response.data.error)
        }


    }
}

export async function getPorjectById(id: Project['_id']) {
    try {
        const { data } = await api(`/projects/${id}`)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log("🚀 ~ createProject ~ error:", error.response.data.error)
            throw new Error(error.response.data.error)
        }


    }
}

type ProjectApiType = {
    formData: ProjectFormaData
    projectId: Project['_id']
}

export async function updateProject({ formData, projectId }: ProjectApiType) {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}`, formData)
        console.log('Desde update PRoject')
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log("🚀 ~ createProject ~ error:", error.response.data.error)
            throw new Error(error.response.data.error)
        }


    }
}

export async function deltePrject(id: Project['_id']) {
    try {
        const { data } = await api.delete<string>(`/projects/${id}`)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log("🚀 ~ createProject ~ error:", error.response.data.error)
            throw new Error(error.response.data.error)
        }


    }
}