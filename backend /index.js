const express=require("express")
const app=express()
const mongoose=require("mongoose")
const dotenv=require("dotenv")

dotenv.config();
//mongo*********************************
mongoose.connect(
    process.env.DB_CONNECT,
    {
        useUnifiedTopology:true, useNewUrlParser:true
    },
    ()=>console.log("connected to mongo db")
)

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-type,Accept");
    next();
})

//Rotes************************************************

const complain=require("./MyRoutes/ComplainRoutes")
app.use(express.json())

//MiddleWare**********************************************

app.use("/api/complain",complain)


app.listen(2000,(req,res)=>console.log("servering running on PORT 2000"))