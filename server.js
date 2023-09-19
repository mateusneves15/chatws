const socketIO = require('socket.io')
const express = require('express')
const app = express()
const httpServer = require('http').createServer(app)

app.use(express.static('public'))

const PORT = 8080
httpServer.listen(PORT, () => console.log('Servidor iniciado na porta ' + PORT))
