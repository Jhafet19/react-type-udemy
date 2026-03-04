import { PrismaClient } from "../../src/generated/prisma/client"
import { PrismaPg } from '@prisma/adapter-pg'

//import { prisma } from "@/src/lib/prisma";
import CategoryIcon from "../ui/CategoryIcon";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})
 
const prisma = new PrismaClient({
  adapter,
})

async function getCategories() {

  return await prisma.category.findMany()
}


export default async function OrderSidebar() {
  const categories = await getCategories()
  return (
    <aside className="md:w-72 md:h-screen bg-white">
      <nav className="mt-10">
        {categories.map(category => {
          return <CategoryIcon key={category.id} category={category} />;
        }
        )}
      </nav>
    </aside>
  )
}
