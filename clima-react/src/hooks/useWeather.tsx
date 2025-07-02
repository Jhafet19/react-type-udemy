import axios from "axios"
import type { SearcType } from "../types"
import { z } from "zod"
import { useMemo, useState } from "react"
import { tr } from "zod/v4/locales"

//import { number, string, object, OutputDataset, type InferOutput, parse } from "valibot"

// function isWeatherResponse(weather: unknown): weather is Weather {
//     return (
//         Boolean(weather) && typeof (weather) === 'object' && typeof (weather as Weather).name === 'string'
//         && typeof (weather as Weather).main.temp === 'number'
//         && typeof (weather as Weather).main.temp_max === 'number'
//         && typeof (weather as Weather).main.temp_min === 'number'
//     )
// }

//ZOD
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()

    })

})
export type Weather = z.infer<typeof Weather>

//ValidBot
// const WeatherSchema = object({
//     name: string(),
//     main: object({
//         temp: number(),
//         temp_max: number(),
//         temp_min: number(),

//     })
// })
const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0,

    }
}
// type Weather = InferOutput<typeof WeatherSchema>
export default function useWeather() {

    const [weather, setWeather] = useState<Weather>(initialState)

    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (search: SearcType) => {
        setLoading(true)
        setWeather(initialState)
        try {

            const appId = import.meta.env.VITE_API_KEY

            const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            const { data } = await axios(geoURL)
            console.log("🚀 ~ fetchWeather ~ data:", data)
            if (!data[0]) {
                setNotFound(true)
                console.log('Clima no encontrado');
                return
            }
            const lat = data[0].lat
            const lon = data[0].lon



            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            // const {data:weatherResult}= await axios<weather>(weatherUrl)
            // console.log("🚀 ~ fetchWeather ~ weatherResult:", weatherResult.main.temp)
            // console.log("🚀 ~ fetchWeather ~ weatherResult:", weatherResult.name)

            // const { data: weatherResult } = await axios(weatherUrl)
            // console.log("🚀 ~ fetchWeather ~ weatherResult:", weatherResult)
            // const result = isWeatherResponse(weatherResult)
            // console.log("🚀 ~ fetchWeather ~ result:", result)
            // if(result){
            //     console.log(weatherResult.name)
            // }
            const { data: weatherResult } = await axios(weatherUrl)
            const result = Weather.safeParse(weatherResult)
            console.log("🚀 ~ fetchWeather ~ result:", result)
            if (result.success) {
                setWeather(result.data)
                console.log(result.data.name);

            }

            //Valibot
            // const { data: weatherResult } = await axios(weatherUrl)
            // const result = parse(WeatherSchema, weatherResult);
            // console.log("🚀 ~ fetchWeather ~ result:", result)
            // if(result){
            //     console.log(result.name)
            // }




        } catch (error) {
            console.log("🚀 ~ fetchWeather ~ error:", error)

        } finally {
            setLoading(false)
        }
    }
    const hasWeatherData = useMemo(() => weather.name, [weather])

    return {
        weather,
        loading,
        fetchWeather,
        hasWeatherData,
        notFound

    }
}
