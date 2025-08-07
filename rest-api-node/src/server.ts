import express from 'express'
const server = express()

//Routeing
server.get('/', (req, res) => {
    res.send('Hola mundo')
})

export default server