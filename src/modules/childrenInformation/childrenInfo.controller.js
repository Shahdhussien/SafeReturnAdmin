import { citizenModel } from "../../../database/models/citizen.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catcheError.js";
import cloudnairy from "../../utils/cloudnairy.js";
import slugify from 'slugify'


//childrenInfo
export const childrenInfo =catchError(async(req,res,next)=>{  
    if(!req.session.isLoggedIn) return res.redirect('/signUp')
    let citizens =await citizenModel.find()
    res.render('childrenInformation.ejs',{citizens})
})


//deleteCitizen 
export const deleteCitizen =catchError(async(req,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signUp')
    const citizen = await citizenModel.findOneAndDelete({_id:req.params.id})
    res.redirect("/childerenInfo");
})



//edit citizen page
export const editCitizen =catchError(async(req,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signIn')
    let citizen = await citizenModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    !citizen && res.redirect("/childerenInfo");
    citizen && res.render('editCitizen.ejs',{citizen})
})


//edit citizen
export const updatetCitizen = catchError(async(req,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signIn')
    if(req.file){
    const {secure_url,public_id}=await cloudnairy.uploader.upload(req.file.path,{folder:`citizen/image`})
    req.body.image={secure_url,public_id}
    }
    req.body.slug=slugify(req.body.name)
    console.log(req.body.slug)
    const newcitizen=await citizenModel.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
    !newcitizen && res.redirect("/childerenInfo");
    newcitizen && res.redirect('/childerenInfo')
})


//addCitizenpage
export const addCitizen = catchError(async(req,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signIn')
    res.render('addCitizen.ejs',{ isLoggedIn: false ,error:req.flash('info')});
})


//addCitizen
export const addCitizens = catchError(async (req,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signIn')
    if(!req.file){
        return  res.render('addCitizen.ejs', {
        error: [{ path: ['image'], message: 'Please upload the photo' }]
    });
    }
    req.body.slug=slugify(req.body.name)
    const {secure_url,public_id}=await cloudnairy.uploader.upload(req.file.path,{folder:`citizen/image`})
    req.body.image={secure_url,public_id}
    console.log(req.body)
    const citizen=await citizenModel.insertMany(req.body)
    res.redirect('/childerenInfo');
})


