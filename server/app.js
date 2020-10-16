const express = require('express')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors')
const { urlencoded } = require('body-parser')
const port = process.env.PORT || 3000
const io = require('socket.io')(http)

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

let health = null
let users = []

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('userConnect', (data)=>{
    console.log('someone connected');
    console.log(data);
    users.push(data)
    let payload = {users, health: 100}
    io.emit('userConnect', payload)
})

  socket.on('sendHealth', (data) => {
    health -= 1
    io.emit('sendHealth', health)
  })
})

http.listen(port, () => console.log(`I love you ${port}`))