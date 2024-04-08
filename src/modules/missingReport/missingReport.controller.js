import { missingmodel } from "../../../database/models/missingreport.model.js";
import { catchError } from "../../utils/catcheError.js";


export const missingReport =catchError(async (req ,res,next)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signUp')
    let reports =await missingmodel.find()
    res.render('missingReport.ejs',{reports})
})



