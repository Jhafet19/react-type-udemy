import e, { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
    static getAllProjects = async (req: Request, res: Response) => {

        try {
            const projects = await Project.find({})
            res.json(projects)
        } catch (error) {
            console.log("🚀 ~ ProjectController ~ error:", error)

        }
    }

    static getProjectById = async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const project = await Project.findById(id).populate('tasks')
            if (!project) {
                const error = new Error('Proyecto no encontrado')
                res.status(404).json({ error: error.message })
            }
            res.json(project)
        } catch (error) {

        }
    }

    static createproject = async (req: Request, res: Response) => {

        try {
            await Project.create(req.body)
            res.send('Proyecto creado Correctamente ')
        } catch (error) {

        }

    }

    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params
        console.log("🚀 ~ ProjectController ~ id:", id)

        try {
            console.log('Aantes de guardar')
            const project = await Project.findById(id)
            console.log('Despues de guardar')

            if (!project) {
                const error = new Error('Proyecto no encontrado')
                res.status(404).json({ error: error.message })
            }
            project.clientName = req.body.clientName
            project.projectName = req.body.projectName
            project.description = req.body.description
            project.save()
            res.send('Proyecto actualizado')
        } catch (error) {
            console.log("🚀 ~ ProjectController ~ error:", error)
            console.log("🚀 ~ ProjectController ~ error:", error.message)

        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const project = await Project.findById(id)
            if (!project) {
                const error = new Error('Proyecto no encontrado')
                res.status(404).json({ error: error.message })
            }
            await project.deleteOne()
            res.send('Proyecto eliminado')
        } catch (error) {

        }
    }
}