import { Schema, model } from "mongoose";
import Joi from "joi";
import { addUpdateSettings, handleSaveError } from "./hooks.js";

const phoneRegexp = /^(\+\d{1,3}\s?)?\(?\d{1,4}\)?[-.\s]?\d{1,12}$/;

const contactScheme = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    }
);

contactScheme.post("save", handleSaveError);
contactScheme.pre("findByIdAndUpdate", addUpdateSettings)
contactScheme.post("findByIdAndUpdate", handleSaveError); 

const Contact = model("contact", contactScheme);

export const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `missing required name field`
    }),
    email: Joi.string().email().required().messages({
        "string.email": `missing required email field`
    }),
    phone: Joi.string().pattern(phoneRegexp).required().messages({
        "any.required": `missing required phone field`
    }),
    favorite: Joi.boolean(), 
});

export const contactUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().pattern(phoneRegexp), 
    favorite: Joi.boolean(), 
});

export const contactUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required() 
})

export default Contact;