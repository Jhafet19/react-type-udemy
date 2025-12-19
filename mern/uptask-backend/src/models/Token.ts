import mongoose, {Document, Schema, Types} from "mongoose";

export interface IToken extends Document {
    token: string,
    user: Types.ObjectId,
    createAt: string
}

const tokenSchema: Schema = new Schema({
    token: {
        type: String,
        required: true
    },
    user:{
        type: Types.ObjectId,
        ref: 'User',
    },
    createAt:{
        type: Date,
        default: Date.now,
        expires: 3600 //1 hora
    }
})

const Token= mongoose.model<IToken>('Token', tokenSchema)

export default Token