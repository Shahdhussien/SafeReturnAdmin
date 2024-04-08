import express from 'express'
import { missingReport } from './missingReport.controller.js'
const missingReportRouter = express.Router()


missingReportRouter.get('/missingReport',missingReport)

export default missingReportRouter