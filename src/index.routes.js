import authRouter from './modules/Auth/auth.router.js';
import childrenInfoRouter from './modules/childrenInformation/childrenInfo.router.js';
import homeRouter from './modules/dashboard/home.router.js';
import foundChildrenRouter from './modules/foundChildren/foundChildren.router.js';
import foundReportRouter from './modules/foundReport/foundReport.router.js';
import missingReportRouter from './modules/missingReport/missingReport.router.js';
import mlModelRouter from './modules/mlModel/mlModel.router.js';
import { AppError } from './utils/AppError.js';
import { globalErrorMiddleware } from './utils/globalErrMiddleware.js';


export function init(app){

app.use(authRouter)
app.use(childrenInfoRouter)
app.use(homeRouter)
app.use(foundChildrenRouter)
app.use(foundReportRouter)
app.use(missingReportRouter)
app.use(mlModelRouter)


app.get('/' ,(req,res)=>{
    res.render('signIn.ejs',{ isLoggedIn: false ,error:req.flash('info')})
})

app.all('*',(req,res,next)=>{
    next(new AppError("invalid url - can't access this endpoint "+req.originalUrl,404))
})

app.use(globalErrorMiddleware)
}
