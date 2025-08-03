import axios from "axios";
import { categoriesApiResponseSchema, DrinksApiResponse, RecipeAPIResponseSchema } from "../utils/recipes-schema";
import type { Drink, searchFilter } from "../types";

export async function getCategories() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const { data } = await axios(url)
    const result = categoriesApiResponseSchema.safeParse(data)
    if (result.success) { return result.data }


}

export async function getRecipies(filters: searchFilter) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`
    const { data } = await axios(url)
    const result = DrinksApiResponse.safeParse(data)
    if (result.success) {
        return result.data
    }

}

export async function getRecipeById(id: Drink['idDrink']) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const { data } = await axios(url)
    const result= RecipeAPIResponseSchema.safeParse(data.drinks[0])

    if(result.success){
        return result.data
    }
}