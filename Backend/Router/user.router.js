const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
const bcrypt = require("bcrypt")
const userRouter = express.Router()
const {Usermodal} = require("../modal/user.modal")

userRouter.get("/", async(req,res)=> {
    const query = req.query
    try {
        const user = await Usermodal.find(query)
        res.status(200).send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

userRouter.post("/register", async (req, res) =>{
    const {name , email , password } = req.body

    try {
        bcrypt.hash(password , 5 , async (err , secure_password) => {
         if(err) { 
            console.log(err)
         }else {
            const user = new Usermodal({
                name,
                email,
                password : secure_password
            })
            await user.save()
            res.status(201).send(  user  )
         }
        }) 
    } catch (error) {  
        console.log(error)
        res.status(500).send("not registered")
    }
})


userRouter.delete("/delete/:id", async (req, res) => {

try {
   const user = await Usermodal.findByIdAndDelete({_id: req.params.id})
     res.send("delete successfull")
} catch (error) {
    console.log(error)
}
})



module.exports = {
    userRouter
}