const express = require('express')
const app = express()


// Start an app server
const args = require('minimist')(process.argv.slice(2))
args['port']
const port = args.port || process.env.PORT || 5000
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
});


function coinFlip() {
 
    let num = Math.round(Math.random())%2;
    
    if(num==0) {return "heads"};
    return "tails";
}

function coinFlips(flips) {
    let arr= [];
    for(let i=0; i<flips; i++) {
      arr[i] = coinFlip();
    }
    return arr;
}

function countFlips(array) {
    let heads =0;
    let tails=0;
    for(let i=0; i < array.length; i++) {
      if(array[i]=="heads") {
        heads++;
      } else {
        tails++;
      }
    }
    return "{ heads: " + heads + ", tails: " + tails + " }"
}

function flipACoin(call) {
    let side = coinFlip();
    let result = "";
    if(side==call) {
      result = "win";
    } else {result="lose";}
    return {call: call, flip: side, result: "win"}
}

// works
app.get('/app/flip', (req, res) => {
    res.status(200).json({ 'flip': coinFlip})
}) 
  
app.get('/app/flips/:number', (req, res) => {
    let flips = coinFlips(req.params.number)
    let count = countFlips(flips);
    res.status(200).json({'raw': flip, 'summary': count})
})

/*
app.get('/app/countflips/:array', (req, res) => {
    let count = countFlips(req.params.array);
    res.status(200).json({'count': count})
})
*/
app.get('/app/flipcoin/call/heads', (req, res) => {
    let flipsCoinheads=flipACoin("heads")
    res.status(200).json(flipsCoinheads)
})

app.get('/app/flipcoin/call/tails', (req, res) => {
    let flipsCointails=flipACoin("tails")
    res.status(200).json(flipsCointails)
})

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});