import request from 'supertest'
import server from '../../server'

describe('POST /api/', () => {
    it('should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({
        })

        expect(response.status).toBe(400)
    })

    it('should validate that the price es greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: "mouse - testing",
            price: 0
        })

        expect(response.status).toBe(400)
    })

    it('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: "mouse - testing",
            price: 17
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')

    })


})


describe('GET /api/products', async () => {
    it('Get a JSON response with products', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('get api/products/:id', async () => {
    it('asdasdas', async () => {
        const productId = 2000
        const response = await request(server).get('/api/products/' + productId)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto No Encontrado')
    })

    it('asdasdasd', async () => {
        const response = await request(server).get('/api/products/not-valid-id')
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('errors')

    })
})

describe('put /api/prdocuts/:id', () => {
    it('', async () => {
        const response = await request(server).put('errors')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(5)


    })
})


describe('Delete /api/products/:id', () => {
    it('', async () => {
        const response = await request(server).delete('/api/products/no-valid')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveProperty('errors')
    })
})


describe('Patch /api/products/:id', () => {
    it('', async () => {
        const response = await request(server).patch('/api/products/no-valid')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveProperty('errors')
    })
})


