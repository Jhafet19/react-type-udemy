import { create } from "zustand";
import { createRecipiesSlice, type RecipesSliceType } from "./recipeSlice";
import { devtools } from "zustand/middleware";
import {  createFavoritesSlice, type FavoritesSliceType,  } from "./favoriteSlice";
import {  createNotificationSlice, type NotificationSliceType,  } from "./notificationSlice";
import {  createAiSlice, type AISlice,  } from "./iaSlice";


export const useAppStore = create<RecipesSliceType & 
FavoritesSliceType & NotificationSliceType & AISlice>()(devtools((...a) => ({
    ...createRecipiesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
    ...createAiSlice(...a),

})))
