import express from 'express'
import { addCitizen, addCitizens, childrenInfo, deleteCitizen, editCitizen, updatetCitizen } from './childrenInfo.controller.js'
const childrenInfoRouter = express.Router()
import { fileUpload, fileValidation } from '../../utils/cloudmulter.js'
import { validate, validation} from '../../middleware/vlidation.js'
import { addCitizenSchema, updateCitizenSchema } from './childrenInfo.validate.js'

childrenInfoRouter.get('/childerenInfo',childrenInfo)
childrenInfoRouter.get('/deleteCitizen/:id',deleteCitizen)
childrenInfoRouter.get('/editCitizen/:id',editCitizen)
childrenInfoRouter.get('/addCitizen',addCitizen)
childrenInfoRouter.post('/addCitizen' ,fileUpload(fileValidation.image).single('image'),validation(addCitizenSchema,'/addCitizen'),addCitizens)
childrenInfoRouter.post('/updateCitizen/:id',fileUpload(fileValidation.image).single('image'),validate(updateCitizenSchema),updatetCitizen)

export default childrenInfoRouter