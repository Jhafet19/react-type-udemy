import { z } from "zod";
import { categoriesApiResponseSchema } from "../utils/recipes-schema";

export type categories=z.infer<typeof categoriesApiResponseSchema>
