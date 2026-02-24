import {Request, Response} from "express";
import Note, {INote} from "../models/Node";
import Types, {Error, Expression} from "mongoose";


type NoteParams = {
    noteId: Types.ObjectId
}

export class NoteController {
    static createNote = async (req: Request<{}, {}, INote>, res: Response) => {
        console.log("🚀 ~ createNote ~ req: ", req.body);
        const {content} = req.body
        const note = new Note()
        note.content = content
        note.createdBy = req.user.id
        note.task = req.task.id
        req.task.notes.push(note.id)

        try {
            await Promise.allSettled([req.task.save(), note.save()])
            res.send('Nota creada correctamente')

        } catch (e) {
            res.status(500).json({error: 'Hubo un erorr'})
        }

    }

    static getTaskNotes = async (req: Request, res: Response) => {
        try {
            const notes = await Note.find({task: req.task.id})

        } catch (e) {
            res.status(500).json({error: 'Hubo un erorr'})

        }
    }

    static deleteNote = async (req: Request<NoteParams>, res: Response) => {
        const {noteId} = req.params
        const note = await Note.findById(noteId)

        if (!note) {
            const error = new Error('Nota no encontrada')
            return res.status(404).json({error: error.message})
        }
        if (note.createdBy.toString() !== req.user.id.toString()) {
            const error = new Error('Accion no valida')
            return res.status(40).json({error: error.message})
        }

        req.task.notes = req.task.notes.filter(note => note.toString() !== noteId.toString())
        try {
            await Promise.allSettled([note.deleteOne(), req.task.notes])
            res.send('Nota Eleminada')
        } catch (e) {
            res.status(500).json({error: 'Hubo un erorr'})

        }
    }
}