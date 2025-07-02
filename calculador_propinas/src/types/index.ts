export type Menuitem={
    id: number,
    name: string,
    price: number
}

export type OrderItem= Menuitem &{
    quantity: number
}