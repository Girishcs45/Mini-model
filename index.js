const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

app.set("views" , path.join(__dirname, "viewa"));
app.set("view engine","ejs");

main().then(() =>{
    console.log("Connection sucessfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get("/", (req,res)=>{
    res.send("Server is running"); 
})

app.listen(8080, () =>{
    console.log("server is Listening on 8080!");
});