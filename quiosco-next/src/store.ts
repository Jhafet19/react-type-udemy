import {create} from "zustand/react";
import {OrderItem} from "@/src/types";

interface Store {
    order: OrderItem[]
}

export const useStore= create<Store>(()=>({
    order: []
}))