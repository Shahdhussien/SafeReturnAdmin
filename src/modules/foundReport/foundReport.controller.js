import { foundModel } from "../../../database/models/foundreport.model.js"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../utils/catcheError.js"

export const foundReport = catchError(async(req,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signUp')
    let reports =await foundModel.find({exist:true})
    res.render('foundReport.ejs',{reports})
})


export const deleteFoundReport = catchError(async(req,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signUp')
    const report = await foundModel.findOneAndDelete({_id:req.params.id})
    !report && next(new AppError(`Report not found`,404))
    report && res.redirect('/foundReport')
})


export const deletefound = catchError(async(req,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signUp')
    const report = await foundModel.findOneAndDelete({_id:req.params.id})
    !report && next(new AppError(`Report not found`,404))
    report && res.redirect('/home')
})


export const editReport = catchError(async(req,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signUp')
    let report = await foundModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    !report && next(new AppError(`Report not found`,404))
    report && res.render('editReport.ejs',{report})
})


export const updateFoundReport = catchError(async(req,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signUp')
    if(req.file){
    const {secure_url,public_id}=await cloudnairy.uploader.upload(req.file.path,{folder:`citizen/image`})
    req.body.image={secure_url,public_id}
    }
    const newReport=await foundModel.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
    !newReport && next(new AppError(`Report not found`,404))
    newReport && res.redirect('/foundReport')
})

