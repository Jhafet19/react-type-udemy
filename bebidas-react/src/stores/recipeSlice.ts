import type { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipies } from "../services/recipeService"
import type { categories, Drink, Drinks, Recipe, searchFilter } from "../types"



export type RecipesSliceType = {
    categories: categories,
    drinks: Drinks,
    selectedRecipe: Recipe,
    modal: boolean,
    fetchCategiries: () => Promise<void>,
    searchRecipies: (searchFiltes: searchFilter) => Promise<void>,
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
}

export const createRecipiesSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as Recipe,
    modal: false,
    fetchCategiries: async () => {

        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipies: async (searchFiltes) => {

        const drinks = await getRecipies(searchFiltes)
        set({
            drinks
        })

    },
    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipeById(id)
        set({
            selectedRecipe,
            modal: true
        })
    },
    closeModal: () => {
        set({
            modal: false,
            selectedRecipe: {} as Recipe
        })
    }
})