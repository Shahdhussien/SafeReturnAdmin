import { adminModel } from "../../../database/models/admin.model.js";
import bcrypt from 'bcrypt'
import { catchError } from "../../utils/catcheError.js";

export const handleLogin = catchError(async(req,res,next)=>{
    const {email ,password } = req.body
    let user = await adminModel.findOne({ email, provider: "system" });
        if(!user || !bcrypt.compareSync(password , user.password)) 
        return res.render('signIn.ejs', {
        error: [{ path: ['wrongemail'], message: 'Incorrect email or password' }]
    });
            req.session.userId = user._id;
            req.session.name = user.userName;
            req.session.isLoggedIn = true;
            // expiry cookies
            var time = 360 * 24 * Math.pow(10, 4);
            req.session.cookie.expires = new Date(Date.now() + time)
            req.session.cookie.maxAge = time
            res.redirect('/home');
})

export const signUp = (req ,res)=>{
    res.render('signUp.ejs',{ isLoggedIn: false ,error:req.flash('info')})
}

export const signIn = (req ,res)=>{
    res.render('signIn.ejs' ,{ isLoggedIn: false ,error:req.flash('info')})
}

export const handleRegister = catchError(async(req,res,next)=>{
    let isUser = await adminModel.findOne({email:req.body.email})
    if(isUser) return res.render('signUp.ejs', {
        error: [{ path: ['email'], message: 'Email already exists' }]
    });
    const user = new adminModel(req.body)
    await user.save()
    res.redirect('/signIn');
    
})




export const logout=async(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
}


