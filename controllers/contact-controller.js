import * as contactsService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import Contact from "../models/Contact.js";
import { contactAddSchema, contactUpdateSchema } from "../models/Contact.js";

const getAll = async (req, res, next) => {
    try {
        const result = await Contact.find();

        res.json(result);
    }
    catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Contact.findOne({ _id: id });
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
            // const error = new Error(`Movie with id=${id} not found`);
            // error.status = 404;
            // throw error;
            // return res.status(404).json({
            //     message: `Contact with id=${id} not found`
            // })
        }

        res.json(result);
    }
    catch (error) {
       res.status(404).json({
            message: error.message
        })
    }
}

const add = async (req, res, next) => {
    // try {

    //     const { error } = contactAddSchema.validate(req.body);
    //     if (error) {
    //         throw HttpError(400, `message": "missing required name field`);
    //     }
        const result = await Contact.create(req.body);

        res.status(201).json(result)
    // }
    // catch (error) {
    //     next(error);
    // }
}

const updateById = async (req, res, next) => {
    // try {
    //     const { error } = contactUpdateSchema.validate(req.body);
    //     if (error) {
    //         throw HttpError(400, error.message);
    //     }
        const { id } = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }

        res.json(result);
    // }
    // catch (error) {
    //     next(error);
    // }
}

const updateStatusContact = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!result) {
            throw HttpError(400, `missing field favorite`)
        }
        res.status(200).json(result)
        //    return updateStatusContact(id, body);
    }
    catch (error) {
        res.status(404).json({
               message: " Not found ",
        })
    }
}

const deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Contact.findByIdAndDelete(id);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }

        // res.status(200).send()

        res.json({
            message: "Delete success"
        })
    }
    catch (error) {
        next(error);
    }
}

export default {
    getAll,
    getById,
    add,
    updateById,
    updateStatusContact, 
    deleteById, 
}
