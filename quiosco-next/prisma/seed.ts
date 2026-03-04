import { categories } from "./data/categories"
import { products } from "./data/products"
import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaPg } from '@prisma/adapter-pg'
 
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})
 
const prisma = new PrismaClient({
  adapter,
})
 
async function main() {
  await prisma.category.createMany({
    data: categories,
  })
 
  await prisma.product.createMany({
    data: products,
  })
 
  console.log("✅ Seed ejecutado correctamente")
}
 
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })