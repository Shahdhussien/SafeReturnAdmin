import express from 'express'
import { deleteFoundChildren, editFoundChildren, foundChildren, foundChildrendetails, updateFoundChildren } from './foundChildren.controller.js'
import { fileUpload, fileValidation } from '../../utils/cloudmulter.js'
import { validate } from '../../middleware/vlidation.js'
import { uFoundChildSchema } from './foundChildren.validate.js'
const foundChildrenRouter = express.Router()


foundChildrenRouter.get('/foundChildren',foundChildren)
foundChildrenRouter.get('/deleteFoundChildren/:id',deleteFoundChildren)
foundChildrenRouter.get('/editFoundChildren/:id',editFoundChildren)
foundChildrenRouter.get('/foundChildrendetails/:id',foundChildrendetails)
foundChildrenRouter.post('/updateFoundChildren/:id',fileUpload(fileValidation.image).single('image'),validate(uFoundChildSchema),updateFoundChildren)

export default foundChildrenRouter