const app = {
    data () {
        return {
            socket: null,
            msgList: [],

            input: {
                msgText: "",
            }
        }
    },
    created () {
        this.socket = new WebSocket('ws://localhost:6969')
        this.socket.onopen = () => {
            console.log('WebSocket connection opened')
        }
        this.socket.onmessage = ({ data }) => {
            this.msgList.push(JSON.parse(data))
        }
        this.socket.onclose = () => {
            console.log('WebSocket connection closed')
            this.socket = null
        }
    },
    methods: {
        sendMessage() {
            if (!this.socket) {
                alert("Server down")
                return
            }
            this.socket.send(this.input.msgText)
            this.input.msgText = ""
        }
    }
}

Vue.createApp(app).mount('#app')