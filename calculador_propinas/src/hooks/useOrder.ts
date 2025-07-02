import { useState } from "react"
import { Menuitem, OrderItem } from "../types"


export default function useOrder() {

    const [oreder, setOrder] = useState<OrderItem[]>([])
    const [tip, setTip] = useState(0)

    function addItem(item: Menuitem) {
        const itemExist = oreder.find(orderItem => orderItem.id === item.id)
        if (itemExist) {
            console.log('ya existe')
            const updateOrder = oreder.map(orderItem =>
                orderItem.id === item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem
            )
            setOrder(updateOrder)
        } else {


            const newItem: OrderItem = { ...item, quantity: 1 }
            setOrder([...oreder, newItem])
        }
    }

    const removeItem = (id: Menuitem['id']) => {
        
        setOrder(oreder.filter(item => item.id !== id))
    }

    const placeOrder = () => {
        setOrder([])
        setTip(0)
    }
    return {
        oreder,
        tip,
        setTip,
        addItem,
        removeItem,
        placeOrder
    }
}