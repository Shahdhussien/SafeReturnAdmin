import { missingmodel } from "../../../database/models/missingreport.model.js";
import { catchError } from "../../utils/catcheError.js";


export const missingReport =catchError(async (req ,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signIn')
    let reports =await missingmodel.find()
    res.render('missingReport.ejs',{reports})
})
export const deleteMissingReport = async(req ,res)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signUp')
    const report = await missingmodel.findOneAndDelete({_id:req.params.id})
    res.redirect('/missingReport')
}


