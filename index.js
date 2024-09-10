//creating server
const express = require('express');

//require mongoose
const mongoose = require('mongoose');

//userMode
const User = require('./models/user.model.js');


//creating app from express
const app = express();

//we must have to enable to use json otherwise we will not be able to send the body
app.use(express.json());


/**
 * Connect mongodb through Mongoose
 */
mongoose.connect("mongodb+srv://ashikurrahman01835:21pqGSthBcUxjDtc@nodecrud.jxp5m.mongodb.net/nodecrud?retryWrites=true&w=majority&appName=nodecrud").then(() => {
    console.log("connected to the database")
}).catch(() => {
    console.log("connnection failed");
})


/**
 * API Routes
 * 
 * Now we have all the http method to send the request. 
request can be get, post, put, patch, delete etc.v
 * 
 *
 */
app.get('/', (req, response) => {
    
    response.send("hello there From Node API aaabbb");

})


//Get  users from the database
app.get('/api/users', async (req, res) => {

    try{

        const users = await User.find({});
        res.status(200).json(users);

    }catch(error){
        res.status(error.status).send().json({
            message: error.message
        });
    }

})

//get single user from the table
app.get('/api/user/:id', async (req, res) => {

    try{

        //destructuring the id from the req.params
        const { id } = req.params;

        const singleUser = await User.findById(id);       

        res.status(200).json(singleUser);

    }catch(error){
        res.status(error.status).send().json({
            message: error.message
        });
    }

} )


//post API
//posting a user to the database
app.post('/api/users', async (req, res) => {

    try{

        const user = await User.create(req.body);
        res.status(200).json(user);

    }catch(error){
        res.status(error.status).send().json({
            message: error.message
        });
    }

})

//Update a user
app.put('/api/user/:id', async (req, res) => {
    
    try{

        const { id } = req.params;

        const user = await User.findByIdAndUpdate(id, req.body);
        
        if(!user){
            return res.status(404).json({message: "user not found"});
        }

        const updateUser = await User.findById(id);

        res.status(200).json(updateUser);
        


    }catch(error){

        res.status(error.status).send().json({
            message: error.message
        });
    }

});


//delete a user

app.delete('/api/user/:id', async (req, res) => {
    
    try{

        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        
        if(!user){
            return res.status(404).json({message: "user not found"});
        }

        res.status(200).json({message: "User successfully Deleted"});
        

    }catch(error){

        res.status(error.status).send().json({
            message: error.message
        });
    }

});














//finally start the server
app.listen(4000, () => {
    console.log('Server is running at 4000')
})

