import { adminNotifModel } from "../../../database/models/adminNotifi.model.js"
import { citizenModel } from "../../../database/models/citizen.model.js"
import { foundChildmodel } from "../../../database/models/foundchildren.model.js"
import { foundModel } from "../../../database/models/foundreport.model.js"
import { missingmodel } from "../../../database/models/missingreport.model.js"



export const notification =async (req ,res)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signUp')
    let notificaitions =await adminNotifModel.find()
    console.log(notificaitions);
    res.render('notification.ejs',{notificaitions})
}
export const deleteNotificaiton = async(req ,res)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signUp')
    const notifi = await adminNotifModel.findOneAndDelete({_id:req.params.id})
    res.redirect('/notification')
}


export const redirectNotification = async (req, res) => {
if (!req.session.isLoggedIn) return res.redirect("/signUp");
    let notification = await adminNotifModel.findOne({ _id: req.params.id });
    if (!notification) {
      return res.redirect("/notification");
    }
    let reports = await foundModel.find({ _id: notification.reportid,exist: false,});
    if (reports.length > 0) {
      let citizen = await citizenModel.find();
      let fchild = await foundChildmodel.find();
      let repor = await foundModel.find({ exist: false });
      let mreport = await missingmodel.find();
      let cfchild = fchild.length;
      let ccitizen = citizen.length;
      let cfreport = repor.length;
      let cmreport = mreport.length;
      return res.render('dashboard.ejs',{reports,cfchild,cfreport,ccitizen,cmreport,isLoggedIn: false, error: req.flash("info")});
    }
    let children = await foundChildmodel.find({ _id: notification.reportid });
    if (children.length > 0) {
      return res.render("foundChildren.ejs", { children });
    }
    res.redirect("/notification");
};











