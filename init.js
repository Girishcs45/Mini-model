const mongoose = require("mongoose");
const chat = require("./models/chat.js");

main().then(() =>{
    console.log("Connection sucessfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
} ;

let allchats = ([
    {
    from : "Girish" ,
    to : "sanket" ,
    msg : "Hii bro how are you!",
    created_at :new Date()
    },
    {
    from : "Kundan",
    to : "Niraj",
    msg : "Kai re compunder?",
    created_at :new Date()
    },
     {
    from : "Appa",
    to : "Kundan",
    msg : "Ek match yeto ka?",
    created_at :new Date()
    },
     {
    from :"Niraj" ,
    to : "Girish",
    msg : "Its ok reee, Its okkk!!!",
    created_at :new Date()
    }
]);

chat.insertMany(allchats);