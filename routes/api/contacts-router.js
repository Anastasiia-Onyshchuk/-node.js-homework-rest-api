import express from "express";
import contactController from "../../controllers/contact-controller.js";
import { isEmptyBody, isvalidId } from "../../middlewars/index.js";
import { validateBody } from "../../decorators/index.js";
import { contactAddSchema, contactUpdateSchema, contactUpdateFavoriteSchema} from "../../models/Contact.js";

const contactsRouter = express.Router();

contactsRouter.get('/', contactController.getAll)

contactsRouter.get('/:id', isvalidId, contactController.getById)

contactsRouter.post('/', isEmptyBody, validateBody(contactAddSchema), contactController.add)

contactsRouter.put('/:id', isEmptyBody, isvalidId, validateBody(contactUpdateSchema), contactController.updateById)

contactsRouter.patch('/:id/favorite', isEmptyBody, isvalidId, validateBody(contactUpdateFavoriteSchema), contactController.updateById)

contactsRouter.delete('/:id', isvalidId, contactController.deleteById)



export default contactsRouter;
