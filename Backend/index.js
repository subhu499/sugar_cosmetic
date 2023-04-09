const express = require("express")
const {connection} = require("./db")
require("dotenv").config()
const app = express()
const {userRouter} = require("./Router/user.router")

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/user", userRouter)


app.listen(8000 ,async () => { 
try {
    await connection
    console.log("Connected to db server")
} catch (error) {
     console.log(error)
}
    console.log("Server is running 8000")
 })