import { adminNotifModel } from "../../../database/models/adminNotifi.model.js"
import { foundModel } from "../../../database/models/foundreport.model.js"



export const notification =async (req ,res)=>{
    if(!req.session.isLoggedIn) return res.redirect('/signUp')
    let notificaitions =await adminNotifModel.find()
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
  let page = notification.page;
  let table = notification.table;
  //let reports = await table.find({exist:false});
  //res.render(page, { reports });
  res.redirect(table);
};







