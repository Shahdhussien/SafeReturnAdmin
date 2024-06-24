import { adminNotifModel } from "../../../database/models/adminNotifi.model.js";
import { citizenModel } from "../../../database/models/citizen.model.js";
import { foundChildmodel } from "../../../database/models/foundchildren.model.js"
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catcheError.js";


export const foundChildren =catchError( async(req,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signIn')
    const children = await foundChildmodel.find();
    res.render("foundChildren.ejs", {children });
})


export const deleteFoundChildren =catchError(async(req,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signIn')
    const child = await foundChildmodel.findOneAndDelete({_id:req.params.id})
    !child && res.redirect("/foundChildren");
    if (child) {
        await adminNotifModel.findOneAndDelete({ reportid: child.id });
        return res.redirect('/foundChildren')
    }    
})

export const editFoundChildren =catchError( async(req,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signIn')
    let child = await foundChildmodel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    !child && res.redirect('/foundChildren')
    child && res.render('editFoundChildren.ejs',{child})
})


export const updateFoundChildren = catchError(async(req,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signIn')
    if(req.file){
    const {secure_url,public_id}=await cloudnairy.uploader.upload(req.file.path,{folder:`citizen/image`})
    req.body.image={secure_url,public_id}
    }
    console.log(req.body)
    const newReport=await foundChildmodel.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
    !newReport && res.redirect('/foundChildren')
    newReport&& res.redirect('/foundChildren')
})


export const foundChildrendetails = catchError(async(req,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signIn')
    let id=req.params.id
    let child = await foundChildmodel.findById(id)
    let citizen =await citizenModel.findOne({name:child.name})
    if(child.updated == false) {
    res.render('foundChildDetails.ejs',{citizen,id})
    }
    res.render('foundChildDetails.ejs',{citizen,child,id})
})


