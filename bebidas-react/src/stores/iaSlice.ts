import { StateCreator } from 'zustand'

export type AISlice = {
    recipe: string
    generateRecipe: (prompt: string) => Promise<void>
}

export const createAiSlice: StateCreator<AISlice> = () => ({
    recipe: '',
    generateRecipe: async (prompt) => {
    console.log("🚀 ~ createAiSlice ~ prompt:", prompt)

    }
})