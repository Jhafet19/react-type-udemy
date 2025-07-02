import { z } from "zod";

export const categoriesApiResponseSchema = z.object({
    drinks: z.array(z.object({ strCategory: z.string() }))
})