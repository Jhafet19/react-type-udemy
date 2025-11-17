import z from "zod";

/** Tasks*/
export const taskStatusSchema = z.enum(["pending", "onHold", "inProgess", "underReview", "completed"])
export type TaskStatus= z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
})


export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>
/* Proyects */
export const prooyectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
})


export const dashboardProjectSchema = z.array(
    prooyectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true
    })
)
export type Project = z.infer<typeof prooyectSchema>
export type ProjectFormaData = Pick<Project, 'clientName' | 'description' | 'projectName'>


