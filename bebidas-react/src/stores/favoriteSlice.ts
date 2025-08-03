import { StateCreator } from 'zustand'
import type { Recipe } from '../types'
import { createRecipiesSlice } from './recipeSlice'

export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe: Recipe) => void
    favoriteExist: (id: Recipe['idDrink']) => boolean
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        console.log("🚀 ~ createFavoritesSlice ~ recipe:", recipe)

        if (get().favoriteExist(recipe.idDrink)) {
            console.log('Si existe');
            set({ favorites: [...get().favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)] })
        }
        else {
            console.log('No existe');
            set({ favorites: [...get().favorites, recipe] })

        }
        

    },
    favoriteExist: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    }

})