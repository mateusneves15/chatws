const socketIO = require('socket.io')
const express = require('express')
const app = express()
const httpServer = require('http').createServer(app)

// Cria um servidor de websocket que usa 
const serverSocket = socketIO(httpServer)
app.use(express.static('public'))

//Cria caminhos virtuais
//app.get("/produtos", (req,res) => res.send('TV<br>Smartphone'))

serverSocket.on('connect', socket => {
    console.log(`Cliente ${socket.id} conectado`);
    socket.on('chat msg', msg => {

        if(socket.login)
        msg = `${socket.login}: ${msg}`
        else {
            socket.login = msg;
            msg = `Usuario ${socket.login} entrou`
        }       
        console.log(msg);
        serverSocket.emit('chat msg', msg)
    });

    socket.on('status',msg => {
        //serverSocket.emit('status', msg)
        socket.broadcast.emit('status', msg)
    });
})

const PORT = 8080
httpServer.listen(PORT, () => console.log('Servidor iniciado na porta ' + PORT))
