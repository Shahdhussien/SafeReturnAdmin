import Joi from "joi";

export const signUpAdminSchema =Joi.object({
    userName:Joi.string().min(2).max(20).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(5).max(35).required(),
    confirmPassword:Joi.string().required().valid(Joi.ref('password')).messages({
        'any.only': 'Passwords must match',}),
})


export const signInAdminSchema =Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(5).max(35).required()
})
