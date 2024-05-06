import { missingmodel } from "../../../database/models/missingreport.model.js";
import { citizenModel } from "../../../database/models/citizen.model.js";
import { foundModel } from "../../../database/models/foundreport.model.js";
import { userModel } from "../../../database/models/user.model.js";
import { foundChildmodel } from "../../../database/models/foundchildren.model.js";
import { catchError } from "../../utils/catcheError.js";
import { AppError } from "../../utils/AppError.js";


export const home =catchError(async (req ,res)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signIn')
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


export const search =catchError(async (req ,res)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signIn')
    const {word} = req.body
    let lCaseWord =word.toLowerCase().trim()
    if(lCaseWord == "found reports" ) return res.redirect('/foundReport');
    if(lCaseWord == "found children"  ) return res.redirect('/foundChildren');
    if(lCaseWord == "missing reports") return res.redirect('/missingReport');
    if(lCaseWord == "children information") return res.redirect('/childerenInfo');
    if(lCaseWord == "home") return res.redirect('/home');    
    res.render('search.ejs')
})










