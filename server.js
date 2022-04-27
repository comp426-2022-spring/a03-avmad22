const express = require('express')
const app = express()

// command line arg instead of 5000
var port = 5000

const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
}) 

