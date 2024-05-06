import { foundChildmodel } from "../../../database/models/foundchildren.model.js";
import { citizenModel } from "../../../database/models/citizen.model.js";
import { AppError } from "../../utils/AppError.js";
import { foundModel } from "../../../database/models/foundreport.model.js";
import { catchError } from "../../utils/catcheError.js";
import axios from 'axios';


export const mlModel = catchError(async (req ,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signin')
    res.render('mlmodel.ejs');
})


export const model =catchError( async(req,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signIn')
    let report = await foundModel.findById({_id:req.params.id})
    !report && next(new AppError(`Report not found`,404))
    const id=report.id
    const img =report.image.secure_url
    res.render('mlmodel.ejs',{img,id});
})


export const istrue = catchError(async (req ,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signIn')
    const Child =await citizenModel.findOne({slug:req.params.name})
    !Child && next(new AppError(`child  not found`,404))
    // const Fchild = await foundChildmodel.findOne({nationalID:Child.nationalID});
    // Fchild && next(new AppError(`child is already added`, 401));
    const foundChild = await foundChildmodel.insertMany({name:Child.name,image:Child.image,parentName:Child.relativeName,
    parentphone:Child.relativePhone,nationalID:Child.nationalID})
    let report = await foundModel.findOneAndDelete({_id:req.params.id})
    !report && next(new AppError(`Report not found`,404))
    res.redirect('/home')
})


export const isfalse = catchError(async (req ,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signIn')
    let report = await foundModel.findByIdAndUpdate({_id:req.params.id},{exist:true})
    !report && next(new AppError(`report  not found`,404))
    report && res.redirect('/home')
})


export const modelhandel = async (req, res) => {
    try {
        let report = await foundModel.findById(req.params.id)
        const imageUrl = report.image.secure_url
        const mlModelEndpoint = 'http://127.0.0.1:5000/predictApi';
        const mlResponse = await axios.post(mlModelEndpoint, {
            imageUrl: imageUrl
        }); 
        const mlResult = mlResponse.data; 
        return res.json({ success: true, result: mlResult });
    } catch (error) {
        console.error('Error processing image with Cloudinary and ML model:', error);
        return res.status(500).json({ success: false, error: 'Error processing image with Cloudinary and ML model' });
    }
};