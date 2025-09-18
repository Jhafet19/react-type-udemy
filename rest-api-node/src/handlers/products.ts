import { Request, Response } from "express";
import Product from "../models/Product.model";
import { check, validationResult } from 'express-validator'


export const getProducts = async (req: Request, res: Response) => {

    try {
        const products = await Product.findAll({
            order: ['id'],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        res.json({ data: products })
    } catch (error) {
        console.log("🚀 ~ getProducts ~ error:", error)

    }
}


export const getProductbyID = async (req: Request, res: Response) => {

    try {
        const id = req.params.id
        console.log("🚀 ~ getProductbyID ~ id:", id)
        const product = await Product.findByPk(id)
        if (!product) {
            return res.status(400).json({ error: "Producto no encontrado" })
        }
        res.json({ data: product })
    } catch (error) {
        console.log("🚀 ~ getProducts ~ error:", error)

    }
}


export const createProduct = async (req: Request, res: Response) => {
    const product = await Product.create(req.body)

    await check('name').notEmpty().withMessage('Nombre del producto no puede ir vacio').run(req)
    await check('price').isNumeric().withMessage('El valor no es valido')
        .custom((value) => value > 0).withMessage('El precio no puede ser negativo')
        .notEmpty().withMessage('el precio del producto no puede ir vacio')
        .run(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errosr: errors.array() })
    }


    res.status(201).json({ data: product });
}


export const updatedProduct = async (req: Request, res: Response) => {

    const id = req.params.id
    console.log("🚀 ~ getProductbyID ~ id:", id)
    const product = await Product.findByPk(id)
    if (!product) {
        return res.status(400).json({ error: "Producto no encontrado" })
    }

    await check('name').notEmpty().withMessage('Nombre del producto no puede ir vacio').run(req)
    await check('price').isNumeric().withMessage('El valor no es valido')
        .custom((value) => value > 0).withMessage('El precio no puede ser negativo')
        .notEmpty().withMessage('el precio del producto no puede ir vacio')
        .run(req)

    await product.update(req.body)
    await product.save()
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errosr: errors.array() })
    }
    res.json({ data: product });
}


export const updatedProductAvailable = async (req: Request, res: Response) => {

    const id = req.params.id
    console.log("🚀 ~ getProductbyID ~ id:", id)
    const product = await Product.findByPk(id)
    if (!product) {
        return res.status(400).json({ error: "Producto no encontrado" })
    }

    await product.update(req.body)
    await product.save()
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errosr: errors.array() })
    }
    res.json({ data: product });
}

export const deletProduct = async (req: Request, res: Response) => {

    const id = req.params.id
    console.log("🚀 ~ getProductbyID ~ id:", id)
    const product = await Product.findByPk(id)
    if (!product) {
        return res.status(400).json({ error: "Producto no encontrado" })
    }

    await product.destroy()
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errosr: errors.array() })
    }
    res.json({ data: 'producto Eliminado' });
}