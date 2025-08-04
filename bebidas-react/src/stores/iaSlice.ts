import { StateCreator } from 'zustand'

export type AISlice = {
    recipe: string
}

export const createAiSlice : StateCreator<AISlice> = () => ({
    recipe: ''
})