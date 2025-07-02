import { create } from "zustand";
import type { CryptoCurrency, CryptoPrice, Pair } from "./types";
import { devtools } from "zustand/middleware";
import { fetchCurrentCryptoPrice, getCryptos } from "./services/CryptoService";


type CryptoStore = {
    result: CryptoPrice
    cryptoCurrencies: CryptoCurrency
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>

}


export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    result: {} as CryptoPrice,
    cryptoCurrencies: [],
    fetchCryptos: async () => {
        const data = await getCryptos()
        set(() => ({ cryptoCurrencies: data }))
    },
    fetchData: async (pair) => {
        console.log("🚀 ~ fetchData: ~ pair:", pair)
        const result = await fetchCurrentCryptoPrice(pair)
        console.log("🚀 ~ fetchData: ~ result:", result)
        set(() => ({
            result
        }))
    }
})))

