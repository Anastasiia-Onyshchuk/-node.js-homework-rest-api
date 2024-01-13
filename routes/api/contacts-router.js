import express from "express";
// import * as contactsService from "../../models/contacts/index.js";
import contactController from "../../controllers/contact-controller.js";
import { isEmptyBody } from "../../middlewars/index.js";

const contactsRouter = express.Router();

contactsRouter.get('/', contactController.getAll)

contactsRouter.get('/:id', contactController.getById)

contactsRouter.post('/', isEmptyBody, contactController.add)

contactsRouter.put('/:id', isEmptyBody, contactController.updateById)

contactsRouter.delete('/:id', contactController.deleteById)



export default contactsRouter;
