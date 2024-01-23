import { isValidObjectId } from "mongoose";

import { HttpError } from "../helpers/index.js";

const isvalidId = (req, res, next) => {
    if (!isValidObjectId(id)) {
        return next(HttpError(404, `${id} not valid id`))
    }  
    next();
}
export default isvalidId