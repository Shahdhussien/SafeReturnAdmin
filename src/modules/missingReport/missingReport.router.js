import express from 'express'
import {deleteMissingReport, missingReport } from './missingReport.controller.js'
const missingReportRouter = express.Router()


missingReportRouter.get('/missingReport' , missingReport)

missingReportRouter.get('/deleteMissingReport/:id',deleteMissingReport)
export default missingReportRouter