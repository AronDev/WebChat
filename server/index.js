const WebSocket = require('ws')

const PORT = process.env.PORT || 6969

const ws = new WebSocket.Server({ port: PORT })

let msgList = []

ws.on('connection', (socket, req) => {
    console.log(`New user connected ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`)

    // Send messages before session
    msgList.forEach(msg => {
        socket.send(JSON.stringify({timestamp: msg.timestamp, user: msg.user, text: msg.text}))
    })

    socket.on('message', message => {
        ws.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                const date = new Date()
                let dateStr = `${date.getFullYear()}-${(date.getMonth() + 1).toString().replace(/(^|\D)(\d)(?!\d)/g, '$10$2')}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                client.send(JSON.stringify({timestamp: dateStr, user: 'anonymous', text: message.toString()}))
                msgList.push({timestamp: dateStr, user: 'anonymous', text: message.toString()})
            }
        })
    })
})

ws.on('listening', () => {
    console.log(`Listening on ${PORT}`)
})