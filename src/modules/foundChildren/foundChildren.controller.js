import { citizenModel } from "../../../database/models/citizen.model.js";
import { foundChildmodel } from "../../../database/models/foundchildren.model.js"
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catcheError.js";


export const foundChildren =catchError( async(req,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signUp')
    const foundchildrens =await foundChildmodel.find()
    res.render('foundChildren.ejs',{foundchildrens})
})


export const deleteFoundChildren =catchError(async(req,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signUp')
    const child = await foundChildmodel.findOneAndDelete({_id:req.params.id})
    !child && next (new AppError('child not found'))
    child && res.redirect('/foundChildren')
})

export const editFoundChildren =catchError( async(req,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signUp')
    let child = await foundChildmodel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    !child && next (new AppError('child not found'))
    child && res.render('editFoundChildren.ejs',{child})
})


export const updateFoundChildren = catchError(async(req,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signUp')
    if(req.file){
    const {secure_url,public_id}=await cloudnairy.uploader.upload(req.file.path,{folder:`citizen/image`})
    req.body.image={secure_url,public_id}
    }
    const newReport=await foundChildmodel.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
    !newReport && next (new AppError('child not found'))
    newReport&& res.redirect('/foundChildren')
})


export const foundChildrendetails = catchError(async(req,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signUp')
    let id=req.params.id
    let child = await foundChildmodel.findById(id)
    let citizen =await citizenModel.findOne({name:child.name})
    if(child.updated == false) {
    res.render('foundChildDetails.ejs',{citizen,id})
    }
    res.render('foundChildDetails.ejs',{citizen,child,id})
    res.redirect('/foundChildren')
})


