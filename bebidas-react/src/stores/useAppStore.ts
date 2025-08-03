import { create } from "zustand";
import { createRecipiesSlice, type RecipesSliceType } from "./recipeSlice";
import { devtools } from "zustand/middleware";
import {  createFavoritesSlice, type FavoritesSliceType,  } from "./favoriteSlice";

export const useAppStore = create<RecipesSliceType & FavoritesSliceType>()(devtools((...a) => ({
    ...createRecipiesSlice(...a),
    ...createFavoritesSlice(...a)

})))
