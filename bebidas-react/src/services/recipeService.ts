import axios from "axios";
import { categoriesApiResponseSchema } from "../utils/recipes-schema";

export async function getCategories() {
    console.log('Desde get Categories');
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const { data } = await axios(url)
    console.log("🚀 ~ getCategories ~ data:", data)
    const result = categoriesApiResponseSchema.safeParse(data)
    console.log("🚀 ~ getCategories ~ result:", result)
    if (result.success) { return result.data }


}