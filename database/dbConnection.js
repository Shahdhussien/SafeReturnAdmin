import mongoose from 'mongoose'
export const dbconnection =()=>{
mongoose.connect(process.env.DB_CONNECTION).then(()=>{
        console.log('Database Connected Successfully');
    }).catch((err)=>{
        console.log('database error');
    })
}