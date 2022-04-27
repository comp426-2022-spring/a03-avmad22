const express = require('express')
const app = express()

// command line arg instead of 5000
var port = 5000

const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
}) 

app.get('/app', (req, res) => {
    res.status(200).end('OK')
    res.type('text/plain')
})

app.get('/app/echo/:number', (req, res) => {
    res.status(200).json({'message': req.params.number})
})

app.use(function(req, res) {
    res.status(404).end("Endpoint does not exist")
    res.type("text/plain")
})