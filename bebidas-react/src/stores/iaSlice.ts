import { StateCreator } from 'zustand'
import aiService from '../services/aiService'

export type AISlice = {
    recipe: string
    isGenerating: boolean
    generateRecipe: (prompt: string) => Promise<void>
}

export const createAiSlice: StateCreator<AISlice> = (set) => ({
    recipe: '',
    isGenerating: false,
    generateRecipe: async (prompt) => {
        set({ recipe: '', isGenerating: true })
        const data = await aiService.generateRecipe(prompt)
        for await (const textPart of data) {
            console.log("🚀 ~ createAiSlice ~ textPart:", textPart)
            set((state) => ({
                recipe: state.recipe + textPart
            }))
        }
        set({ isGenerating: false })
    }
})