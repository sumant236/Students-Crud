const express = require("express");
const app = express();
const fs = require('fs')
let users = require("./users.json")
const PORT = 8000;

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Welcome to Home Page");
})

app.get("/users", (req, res) => {
    res.json(users);
})

app.post("/users", (req, res) => {
    users.push(req.body);
    fs.writeFileSync(`${__dirname}/users.json`, JSON.stringify(users));
    res.json(req.body);
    console.log(`${req.body} added successfully`);
})

app.patch("/users/:id", (req, res) => {
    const {id} = req.params;
    users = users.map((user)=> {
        if(user.id === Number.parseInt(id)){ 
            user = {...user, ...req.body};
            // fs.writeFileSync(`${__dirname}/users.json`, JSON.stringify(users))
            console.log(req.body);
            console.log(user);
        }
        return user;
    })
    res.json(users);
})

app.delete("/users/:id", (req, res) => {
    const {id} = req.params;
    console.log(users)
    users = users.filter((user)=>{
        if(user.id == id){
            return false
        }
        else    
            return true
    })
    res.json(users);
})

app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
})