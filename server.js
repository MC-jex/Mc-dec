const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let clients = [];  // Array para almacenar las conexiones

wss.on('connection', (ws) => {
    console.log('Nuevo cliente conectado');
    clients.push(ws);  // Agregar el cliente a la lista

    ws.on('message', (message) => {
        console.log('Mensaje recibido:', message);

        // Enviar el mensaje a todos los clientes conectados
        clients.forEach(client => {
            if (client !== ws) {
                // Asegurarnos de enviar solo texto y no objetos binarios
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        // Eliminar el cliente de la lista al desconectarse
        clients = clients.filter(client => client !== ws);
        console.log('Cliente desconectado');
    });

    ws.on('error', (error) => {
        console.error('Error en WebSocket:', error);
    });
});

console.log('Servidor WebSocket en puerto 8080');
