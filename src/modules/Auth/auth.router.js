import express from 'express'
import {  handleLogin, handleRegister,logout,signIn,signUp } from './auth.controller.js'
const authRouter = express.Router()
import { validation } from '../../middleware/vlidation.js'
import { signInAdminSchema, signUpAdminSchema } from './auth.validation.js'


authRouter.get('/signUp',signUp)
authRouter.get('/signIn',signIn)
authRouter.post('/handleLogin',validation(signInAdminSchema),handleLogin)
authRouter.post('/handleRegister' ,validation(signUpAdminSchema),handleRegister)
authRouter.get('/logout',logout)

export default authRouter
