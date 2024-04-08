import Joi from'joi';


export const uFoundChildSchema = Joi.object({
    id:Joi.string().alphanum().length(24).required(),
    orphanageName:Joi.string().allow('',null).optional(),
})