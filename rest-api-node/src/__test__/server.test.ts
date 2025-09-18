import request from "supertest";
import server, { connectDB } from "../server";
import db from '../config/db'
describe('Get /api', () => {
    it('should send back a json response ', async () => {
        const res = await request(server).get('/api2')


        // console.log("🚀 ~ res:", res)
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('Desde API')

        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('desde api')
    })
})

jest.mock('../config/db')

describe('Conect db', () => {
    it('asd', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Hubo un error'))
        
    })
})