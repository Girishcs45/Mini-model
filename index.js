const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views" , path.join(__dirname, "views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride("_method"));

main().then(() =>{
    console.log("Connection sucessfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
} ;

// INdex Route
app.get("/chats",async (req, res) => {
    let chats = await chat.find();
    // console.log(chats);
    res.render("index.ejs", {chats});
});

// New chat route
app.get("/chats/new",(req,res) =>{
    res.render("new.ejs");
});

// Create route
app.post("/chats",(req,res) =>{
    let {from,to,msg}=req.body;
    let newchat = new chat({
        from : from,
        to : to,
        msg : msg,
        created_at: new Date()
    });
   newchat.save().then((res) =>{
    console.log(res);
   }).catch((err) => {
    console.log(err);
   });
    res.redirect("/chats");
});

// edit route
app.get("/chats/:id/edit", async (req,res)=>{
    let {id} = req.params;
    let Chat= await chat.findById(id);
    res.render("edit.ejs" ,{Chat});
});

// UPDATE ROUTE
app.put("/chats/:id",async (req,res) => {
    let { id } = req.params;
    let { msg : newmsg} = req.body;
    let updatedchat=await chat.findByIdAndUpdate(id,{msg : newmsg},
    {runValidators : true, new : true });

    res.redirect("/chats");

});

// Destroy route
app.delete("/chats/:id", async(req,res)=>{
    let {id} = req.params;
    let deletedchat = await chat.findByIdAndDelete(id);
    console.log(deletedchat);
    res.redirect("/chats");
});

app.get("/", (req,res)=>{
    res.send("Server is running"); 
});

app.listen(8080, () =>{
    console.log("server is Listening on 8080!");
});