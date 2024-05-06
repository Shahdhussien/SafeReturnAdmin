
export const validation = (schema,path) =>{
    return (req ,res, next)=>{
        let { error } = schema.validate(req.body ,{abortEarly:false })
        if(!error?.details){
            next()
        }else{
            req.flash('info' ,error?.details)
            res.redirect(path);
        }
    }
}


export const validate = (schema)=>{
    return (req,res,next)=>{
        const {error}=schema.validate({...req.body,...req.params,...req.query},{abortEarly:false})
        let errors=[]
        if(error){
            error.details.forEach((elm)=>{
                errors.push({message:elm.message , field:elm.path[0] })
            })
            console.log(error.details)
            res.json(errors)
        }else{
            next()
        }
    }
}