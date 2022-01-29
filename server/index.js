const WebSocket = require('ws')

const PORT = process.env.PORT || 6969

const ws = new WebSocket.Server({ port: PORT })

ws.on('connection', (socket, req) => {
    console.log(`New user connected ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`)

    socket.on('message', message => {
        ws.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                const date = new Date()
                let dateStr = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)} ${date.getHours().toString().padStart(2, 0)}:${date.getMinutes().toString().padStart(2, 0)}:${date.getSeconds().toString().padStart(2, 0)}`
                client.send(JSON.stringify({timestamp: dateStr, user: 'anonymous', text: message.toString()}))
            }
        })
    })
})

ws.on('listening', () => {
    console.log(`Listening on ${PORT}`)
})