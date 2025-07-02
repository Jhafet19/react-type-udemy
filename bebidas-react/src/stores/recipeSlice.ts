import type { StateCreator } from "zustand"
import { getCategories } from "../services/recipeService"
import type { categories } from "../types"



export type RecipesSliceType = {
    categories: categories,
    fetchCategiries: () => Promise<void>
}

export const createRecipiesSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    fetchCategiries: async () => {

        const categories = await getCategories()
        set({
            categories
        })
    }
})