window.addEventListener('load',() => {
    const socket = io();
    console.log('Conectado ao servidor de WS');

    socket.on('status', msg => document.getElementById('status').innerHTML = msg)

    const msgInput = document.getElementById('msg')
    msgInput.addEventListener('keydown', () =>{

        if(socket.login){
            const msgStatus = `${socket.login} está digitando...`
            socket.emit('status', msgStatus)
        }
    });

    msgInput.addEventListener('keyup', () => socket.emit('status', ''))
    
    // Aguardando mensagens encaminhadas pelo servidor
    socket.on('chat msg', msg => {
        console.log(`Msg recebida de ${socket.id}: ${msg}`);
        const mensagens = document.getElementById('mensagens');
        mensagens.innerHTML += `<li>${msg}</li>`;
    })

    const form1 = document.getElementById('form1');
    form1.addEventListener('submit', evt => {
        const msg = document.getElementById('msg').value
        if(!socket.login)
            socket.login = msg;

        socket.emit('chat msg', msg)
        console.log('Enviando mensagem para o servidor')
        evt.preventDefault();
    })
})