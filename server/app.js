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

let users = []

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('userConnect', (data)=>{
    console.log('someone connected')
    console.log(data)

    if (users.length == 0) {
      users.push(data)
    } else if (users[0].username != data.username && users.length < 2) {
      users.push(data)
    }
    io.emit('userConnect', users)
})

  socket.on('sendHealth', (data) => {
    users.map(el => {
      if (el.username != data.username) {
        el.health = el.health - 1
      }
    }) 
    io.emit('sendHealth', users)
  })
})

http.listen(port, () => console.log(`I love you ${port}`))