import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
export default function BudgetTracker() {
    const { state, totalExpense, remainigExpensse, dispatch } = useBudget();
    const percentage = ((totalExpense / state.budget) * 100).toFixed(2)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className=" flex justify-center">
                <CircularProgressbar
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage === 100 ? '#dc2626' : '#3b82f6',
                        trailColor: '#f5f5f5',
                        textColor: '#3b82f6',
                        textSize: 8
                    })}
                    text={`${percentage} Gastado`}

                />
            </div>
            <div className="flex flex-col items-center gap-8">
                <button className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg" type="button"
                    onClick={() => dispatch({ type: 'reset-app' })}
                >
                    Resetear App
                </button>
                <AmountDisplay
                    label="Presupuesto"
                    amount={state.budget}
                />
                <AmountDisplay
                    label="Disponible"
                    amount={remainigExpensse}
                />
                <AmountDisplay
                    label="Gastado"
                    amount={totalExpense}
                />
            </div>
        </div>
    )
}
