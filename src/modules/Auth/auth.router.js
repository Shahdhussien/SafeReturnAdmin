import express from 'express'
import {  handleLogin, handleRegister,logout,signIn,signUp } from './auth.controller.js'
import { adminModel } from "../../../database/models/admin.model.js";
import { validation } from '../../middleware/vlidation.js'
import { customAlphabet } from "nanoid";
import { signInAdminSchema, signUpAdminSchema } from './auth.validation.js'
import passport from "passport";
const authRouter = express.Router();
import dotenv from "dotenv";
dotenv.config();



authRouter.get('/signUp',signUp)
authRouter.get('/signIn',signIn)
authRouter.post('/handleLogin',validation(signInAdminSchema,'/signIn'),handleLogin)
authRouter.post('/handleRegister' ,validation(signUpAdminSchema,'/signUp'),handleRegister)
authRouter.get('/logout',logout)
authRouter.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }))



authRouter.get("/google/callback", passport.authenticate('google', { session: false }), async (req, res) => {

  let user = await adminModel.findOne({
    email: req.user.email,
    provider: "google",
  });
  if (!user) {
    const customPassword = customAlphabet("123456789hhjggfdghyjukl;kjuhygtfrdsdfgtyhlkjh",9);
    console.log("Adding new Gmail user to DB..");
    let newuser = new adminModel({
      email: req.user.email,
      userName: req.user.displayName,
      provider: req.user.provider,
      password: customPassword,
    });
    await newuser.save();
    console.log(newuser);
     req.session.userId = newuser._id;
     req.session.name = newuser.userName;
     req.session.isLoggedIn = true;
     var time = 360 * 24 * Math.pow(10, 4);
     req.session.cookie.expires = new Date(Date.now() + time);
     req.session.cookie.maxAge = time;
     res.redirect("/home");
  } else {
    console.log("Gmail User already exist in DB..");
    console.log(user);
     req.session.userId = user._id;
     req.session.name = user.userName;
     req.session.isLoggedIn = true;
     // expiry cookies
     var time = 360 * 24 * Math.pow(10, 4);
     req.session.cookie.expires = new Date(Date.now() + time);
     req.session.cookie.maxAge = time;
     res.redirect("/home");
  }
})


authRouter.get("/facebook", passport.authenticate('facebook', { scope: 'email' }));

authRouter.get('/facebook/callback',passport.authenticate('facebook', { session: false }),async (req, res) => {

  const user = await adminModel.findOne({
    accountId: req.user.accountID,
    provider: "facebook",
  });
  if (!user) {
    const customPassword = customAlphabet("123456789hhjgfdghyjukl;kjuhygtfrdsdfgtyhlkjh",9);
    console.log("Adding new Facebook user to DB..");
    const newuser = new adminModel({
      accountId: req.user.id,
      userName: req.user.displayName,
      provider: req.user.provider,
      password: customPassword,
    });
    await newuser.save();
    console.log(newuser);
    req.session.userId = newuser._id;
    req.session.name = newuser.userName;
    req.session.isLoggedIn = true;
    var time = 360 * 24 * Math.pow(10, 4);
    req.session.cookie.expires = new Date(Date.now() + time);
    req.session.cookie.maxAge = time;
    res.redirect("/home");

  } else {
    console.log("Gmail User already exist in DB..");
    console.log(user);
    req.session.userId = user._id;
    req.session.name = user.userName;
    req.session.isLoggedIn = true;
    var time = 360 * 24 * Math.pow(10, 4);
    req.session.cookie.expires = new Date(Date.now() + time);
    req.session.cookie.maxAge = time;
    res.redirect("/home");
  }

})

export default authRouter
