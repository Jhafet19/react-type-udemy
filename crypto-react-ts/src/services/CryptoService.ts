import axios from "axios"
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from "../schemas/crypto-schema"
import type { Pair } from "../types"

export async function getCryptos() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    const { data: { Data } } = await axios(url)

    const result = CryptoCurrenciesResponseSchema.safeParse(Data)


    if (result.success) {
        return result.data
    }
}

export async function fetchCurrentCryptoPrice(pair: Pair) {
    console.log("🚀 ~ fetchCurrentCryptoPrice ~ pair:", pair)
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${pair.cryptoCurrency}&tsyms=${pair.currency}`
    const { data } = await axios.get<Record<string, number>>(url)
    const rawPrice = data[pair.currency]
    const result = CryptoPriceSchema.safeParse(rawPrice)

    if (!result.success) {
        throw new Error(`Respuesta de API no válida: ${result.error}`)
    }

    return result.data
    // console.log("🚀 ~ fetchData: ~ DISPLAY:", DISPLAY[pair.cryptoCurrency][pair.currency])

    // const result = CryptoPriceSchema.safeParse(DISPLAY[pair.cryptoCurrency][pair.currency])
    // console.log("🚀 ~ fetchData: ~ result:", result)
    // if (result.success) {
    //     console.log(result.data);
    //     return result.data
    // }
}