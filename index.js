//creating server
const express = require('express');

const app = express();

//now we have all the http method to send the request. A request can be get, post, put, patch, delete etc.

//finally start the server
app.listen(4000, () => {
    console.log('Server is running at 4000')
})

/**
 * API Routes
 */
app.get('/', (req, response) => {
    
    response.send("hello there From Node API aaabbb");

})


