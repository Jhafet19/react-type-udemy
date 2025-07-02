import { useReducer, createContext, type Dispatch, type ReactNode, useMemo } from "react"
import { budgetReducer, initialState, type BudegetState, type BudgetActions } from "../reducers/budget-reducer"


type BudgetContextProps = {
    state: BudegetState
    dispatch: Dispatch<BudgetActions>,
    totalExpense : number,
    remainigExpensse: number
}
type BudgetProviderProps = {
    children: ReactNode
}
export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)

export const BudgetProvider = ({ children }: BudgetProviderProps) => {


    const [state, dispatch] = useReducer(budgetReducer, initialState)
    const totalExpense = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses]);
    const remainigExpensse = state.budget - totalExpense;


    return (
        <BudgetContext.Provider value={{ state, dispatch, totalExpense, remainigExpensse }}>
            {children}
        </BudgetContext.Provider>
    )
}