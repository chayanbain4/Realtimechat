const express = require('express')
const app = express()

const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})



app.use(express.urlencoded({ extended: true })); // Middleware to parse form data

app.use(express.static(__dirname + '/public'))



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/submit-form', (req, res) => {
    // Handle form submission with only the name
    const name = req.body.name;

    // Your processing logic here

    // Send a response
    res.send(`Form submitted successfully! Name: ${name}`);
});



// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})

