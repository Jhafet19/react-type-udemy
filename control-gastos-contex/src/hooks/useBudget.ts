import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContex"

export const useBudget = () => {
    const context = useContext(BudgetContext)
    if(!context){
        throw new Error ('No hay contexto disponible')
    }
    return context
}