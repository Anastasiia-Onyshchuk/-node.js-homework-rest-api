import { HttpError } from "../helpers/index.js";
import Contact from "../models/Contact.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (res, next) => {
    try {
        const result = await Contact.find();

        res.json(result);
    }
    catch (error) {
        next(error);
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Contact.findOne({ _id: id });
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }

        res.json(result);
    }
    catch (error) {
       res.status(404).json({
            message: error.message
        })
    }
}

const add = async (req, res) => {
        const result = await Contact.create(req.body);

        res.status(201).json(result)
}

const updateById = async (req, res, next) => {
        const { id } = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }

        res.json(result);
}

// const updateStatusContact = async (req, res) => {
//     // try {
//     const { id } = req.params;
//     const result = await Contact.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
//     if (!result) {
//         throw HttpError(400, `missing field favorite`)
//     }
//     res.status(200).json(result)
// }

const deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Contact.findByIdAndDelete(id);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }
    }
    catch (error) {
        next(error);
    }

        res.json({
            message: "Delete success"
        })
}
export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    updateStatusContact: ctrlWrapper(updateById), 
    deleteById: ctrlWrapper(deleteById),
}