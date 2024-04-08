import Joi from'joi';


export const addCitizenSchema = Joi.object({
    name:Joi.string().min(2).max(20).required(),
    DOB:Joi.date().required(),
    nationalID:Joi.string().pattern(/^\d{14}$/).required(),
    relativePhone:Joi.string().pattern(/^(?:\+20|0)?1[0125]\d{8}$/).required(),
    relativeName:Joi.string().min(2).max(20).required(),
    relativeNationalID:Joi.string().pattern(/^\d{14}$/).required(),
    relationship:Joi.string().required(),
    country:Joi.string().required(),
    city:Joi.string().required(),
    street:Joi.string().required(),
})

export const updateCitizenSchema = Joi.object({
    id:Joi.string().alphanum().length(24).required(),
    name:Joi.string().min(2).max(20).allow('',null).optional(),
    DOB:Joi.date().allow('',null).optional(),
    nationalID:Joi.string().pattern(/^\d{14}$/).allow('',null).optional(),
    relativePhone:Joi.string().pattern(/^(?:\+20|0)?1[0125]\d{8}$/).allow('',null).optional(),
    relativeName:Joi.string().min(2).max(20).allow('',null).optional(),
    relativeNationalID:Joi.string().pattern(/^\d{14}$/).allow('',null).optional(),
    relationship:Joi.string().allow('',null).optional(),
    country:Joi.string().allow('',null).optional(),
    city:Joi.string().allow('',null).optional(),
    street:Joi.string().allow('',null).optional(),
})

