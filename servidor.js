const express= require("express")
const contendor = require("./Contenedor");

let Content = contendor.Content;
let content = new Content(
  "./products.txt"
);

const app =express()
const PORT =8080

const server = app.listen(PORT,()=>{
    console.log(`servidor http escuchando ${server.address().port}`)
}) 

server.on("error",error =>console.log(`error e el servidor ${error}`))

app.get("/productos", async (req,res)=>{
   const products = await content.getAll()
   res.send(products)
})

app.get("/productoRandom",async (req,res)=>{
   const index = Math.floor(Math.random() * 3) +1
   const product = await content.getById(index)
   res.send(product)
})