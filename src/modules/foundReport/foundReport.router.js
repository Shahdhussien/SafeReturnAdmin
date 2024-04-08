import express from 'express'
import { foundReport, deleteFoundReport, updateFoundReport, editReport, deletefound } from './foundReport.controller.js'
import { fileUpload, fileValidation } from '../../utils/cloudmulter.js'
import { validate } from '../../middleware/vlidation.js'
import { uFoundReportSchema } from './foundReport.validate.js'

const foundReportRouter = express.Router()


foundReportRouter.get('/foundReport',foundReport)
foundReportRouter.get('/deleteFoundReport/:id',deleteFoundReport)
foundReportRouter.get('/deletefound/:id',deletefound)
foundReportRouter.get('/editReport/:id',editReport)
foundReportRouter.post('/updateFoundReport/:id',fileUpload(fileValidation.image).single('image'),validate(uFoundReportSchema),updateFoundReport)



export default foundReportRouter