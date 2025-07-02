import { ChangeEvent, Dispatch, FormEvent, useState, useEffect } from "react";
import { categories } from "../data/categories";
import type { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activityReducer";
import { v4 as uuidv4 } from 'uuid'

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}
export default function Form({ dispatch, state }: FormProps) {
    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if (state.activeId) {
            console.log("En state active ID")
            const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectActivity)
        }
    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories, } = activity
        return name.trim() !== '' && calories > 0
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({ type: 'save-activity', payload: { newActivity: activity } })
        setActivity({ ...initialState, id: uuidv4() })
        console.log(activity)

    }
    return (
        <form action="" className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className=" g rid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoria:</label>
                <select name="" id="category" className="border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.category}
                    onChange={handleChange}

                >
                    {categories.map((category) => (
                        <option value={category.id} key={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

            </div>
            <div className=" g rid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Activiad:</label>
                <input type="text" name="" id="name" className="border-slate-300  p-2 rounded-lg w-full"
                    placeholder="Ej. Comida, Jugo de naranja" value={activity.name}
                    onChange={handleChange}

                />
            </div>

            <div className=" g rid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorias:</label>
                <input type="number" name="" id="calories" className="border-slate-300  p-2 rounded-lg w-full"
                    placeholder="Calorias. Ej 300"
                    value={activity.calories}
                    onChange={handleChange}

                />
            </div>
            <input type="submit" name="" id="" className="bg-gray-800 hover:bg-gray-950 w-full p-2 font-bold uppercase text-white
            disabled:opacity-10
            "
                value={activity.category === 1 ? 'Guardar comida' : 'Guardar ejercicio'}
                disabled={!isValidActivity()}
            />

        </form>
    )
}
