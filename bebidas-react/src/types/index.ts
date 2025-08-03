import { z } from "zod";
import { categoriesApiResponseSchema, DrinkApiResponse, DrinksApiResponse, RecipeAPIResponseSchema, SearchFilterSchema } from "../utils/recipes-schema";

export type categories = z.infer<typeof categoriesApiResponseSchema>
export type searchFilter = z.infer<typeof SearchFilterSchema>
export type Drinks = z.infer<typeof DrinksApiResponse>

export type Drink = z.infer<typeof DrinkApiResponse>

export type Recipe = z.infer<typeof RecipeAPIResponseSchema>