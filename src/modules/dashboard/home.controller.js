import { missingmodel } from "../../../database/models/missingreport.model.js";
import { citizenModel } from "../../../database/models/citizen.model.js";
import { foundModel } from "../../../database/models/foundreport.model.js";
import { userModel } from "../../../database/models/user.model.js";
import { foundChildmodel } from "../../../database/models/foundchildren.model.js";
import { catchError } from "../../utils/catcheError.js";
import { AppError } from "../../utils/AppError.js";


export const home =catchError(async (req ,res)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signUp')
    let citizen = await citizenModel.find()
    let fchild = await foundChildmodel.find()
    let reports = await foundModel.find({exist:false})
    let mreport = await missingmodel.find()
    let users = await userModel.find()
    let cfchild=await fchild.length
    let ccitizen=await citizen.length
    let cfreport=await reports.length
    let cmreport=await mreport.length
    res.render('dashboard.ejs',{reports,cfchild,cfreport,ccitizen,cmreport} );

})

export const model =catchError( async(req,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signUp')
    let report = await foundModel.findById({_id:req.params.id})
    !report && next(new AppError(`Report not found`,404))
    const id=report.id
    const img =report.image.secure_url
    res.render('mlmodel.ejs',{img,id});
})





