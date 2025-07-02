import { create } from "zustand";
import { createRecipiesSlice, type RecipesSliceType } from "./recipeSlice";

export const useAppStore = create<RecipesSliceType>((...a) => ({
    ...createRecipiesSlice(...a)
}))