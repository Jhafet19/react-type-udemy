import {NextFunction, Request, Response} from "express";
import {Error} from "mongoose";
import jwt from 'jsonwebtoken'
import User, {IUser} from "../models/User";

declare global{
    namespace Express{
        interface Request{
            user?: IUser
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    console.log("🚀 ~ authenticate ~ req: ", req.headers.authorization);
    const bearer = req.headers.authorization
    if (!bearer) {
        const error = new Error('No autorizado')
        return res.status(401).json({error: error.message})

    }

    const token = bearer.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (typeof decoded === 'object' && decoded.id) {
            const user = await User.findById(decoded.id).select('_id name email')
            console.log("🚀 ~ authenticate ~ user: ", user);
            if (user) {
                req.user = user
            } else {
                res.status(500).json({error: 'Token no válido '})
            }
        }
    } catch (e) {
        res.status(500).json({error: 'Token no válido '})
    }
    next()

}