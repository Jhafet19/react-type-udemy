import { StateCreator } from 'zustand'
import type { Recipe } from '../types'
import { createNotificationSlice, type NotificationSliceType } from './notificationSlice'

export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe: Recipe) => void
    favoriteExist: (id: Recipe['idDrink']) => boolean
    loadFromStorage: () => void
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType & NotificationSliceType,[],[], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        console.log("🚀 ~ createFavoritesSlice ~ recipe:", recipe)

        if (get().favoriteExist(recipe.idDrink)) {
            console.log('Si existe');
            set({ favorites: [...get().favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)] })
        
            createNotificationSlice(set,get,api).showNotification({text:'se elimino de favoritos', 
                error:false})
        }
        else {
            console.log('No existe');
            set({ favorites: [...get().favorites, recipe] })
            createNotificationSlice(set,get,api).showNotification({text:'se agrego a favoritos', 
                error:false})

        }
        localStorage.setItem('favorites',JSON.stringify(get().favorites))
        

    },
    favoriteExist: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage:()=>{
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites){
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }

})