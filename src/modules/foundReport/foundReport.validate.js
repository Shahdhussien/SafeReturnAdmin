import Joi from'joi';


export const uFoundReportSchema = Joi.object({
    id:Joi.string().alphanum().length(24).required(),    
    orphanageName:Joi.string().allow('',null).optional(),
})