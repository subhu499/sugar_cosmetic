const express = require('express')
const createError = require('http-error')
const {Usermodal} = require("../modal/user.modal")

const authRouter = express.Router()

authRouter.post('/register', async (req , res , next)=> {
    console.log(req.body)
    try {
        const result = await authRegisterSchema.validateAsync(req.body);
    
        const ifExist = await User.findOne({ email: result.email });
        if (ifExist) throw createError.Conflict("Email already exist");
    
        const user = new User(result);
        const savedUser = await user.save();
        const accessToken = await signAccessToken(savedUser.id);
        const refreshToken = await signAccessToken(savedUser.id);
        return res.send({ accessToken, refreshToken, user });
      } catch (error) {
        if (error.isJoi === true) error.status = 422;
        next(error);
      }
});

