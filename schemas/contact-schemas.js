import Joi from "joi";

export const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `missing required name field`
    }),
    email: Joi.string().email().required().messages({
        "string.email": `missing required email field`
    }),
    phone: Joi.string().pattern(/^(\+\d{1,3}\s?)?\(?\d{1,4}\)?[-.\s]?\d{1,12}$/).required().messages({
        "any.required": `missing required phone field`
    }),
});

export const contactUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(), 
});
