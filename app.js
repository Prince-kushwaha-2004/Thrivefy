const express=require("express");
const app=express();
const methodOverride = require("method-override");
app.use(methodOverride("_method"))
const path = require("path");
const ejsMate = require("ejs-mate");
app.engine('ejs', ejsMate);




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(8080,()=>{
    console.log("server listning from port 8080");
})


app.get("/",(req,res)=>{
    res.render("index.ejs");
})