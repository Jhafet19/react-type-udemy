import { useEffect, useState } from 'react'
import { db } from '../data/db'


export const useCart = () => {
    const initialCart = () => {
        const cart = localStorage.getItem('cart')
        return cart ? JSON.parse(cart) : []
    }

    const [data] = useState(db)


    const [cart, setCart] = useState(initialCart)


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
    function addToCart(item) {
        const guitarExist = cart.findIndex((guitar) => guitar.id === item.id)

        if (guitarExist >= 0) {
            const updateCart = [...cart]
            updateCart[guitarExist].quantity++
            setCart(updateCart)
        } else {
            item.quantity = 1
            setCart((prevCart) => [...prevCart, item])
        }
    }

    function removeFromCart(id) {
        setCart((prevCart) => prevCart.filter(guitar => guitar.id !== id))
    }
    function increaseQuantity(id) {
        const updateCart = cart.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })

        setCart(updateCart)
    }

    function decreaseQuantity(id) {
        const updateCart = cart.map(item => {
            if (item.id === id && item.quantity > 1) {

                return {
                    ...item,
                    quantity: item.quantity - 1
                }

            }
            return item
        })

        setCart(updateCart)
    }
    function clearCart() {
        setCart([])
    }

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart

    }
}

