import { foundChildmodel } from "../../../database/models/foundchildren.model.js";
import { citizenModel } from "../../../database/models/citizen.model.js";
import { AppError } from "../../utils/AppError.js";
import { foundModel } from "../../../database/models/foundreport.model.js";
import { catchError } from "../../utils/catcheError.js";


export const mlModel = catchError(async (req ,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signUp')
    res.render('mlmodel.ejs');
})


export const istrue = catchError(async (req ,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signUp')
    const Child =await citizenModel.findOne({slug:req.params.name})
    !Child && next(new AppError(`child  not found`,404))
    const foundChild = await foundChildmodel.insertMany({name:Child.name,image:Child.image,parentName:Child.relativeName,
    parentphone:Child.relativePhone,nationalID:Child.nationalID})
    let report = await foundModel.findOneAndDelete({_id:req.params.id})
    !report && next(new AppError(`Report not found`,404))
    res.redirect('/home')
})

export const isfalse = catchError(async (req ,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signUp')
    let report = await foundModel.findByIdAndUpdate({_id:req.params.id},{exist:true})
    !report && next(new AppError(`report  not found`,404))
    report && res.redirect('/home')
})