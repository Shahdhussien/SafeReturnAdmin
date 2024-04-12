import express from 'express'
import {isfalse, istrue, mlModel, modelhandel} from './mlModel.controller.js'
const mlModelRouter = express.Router()


mlModelRouter.get('/mlModel/:id',mlModel)
mlModelRouter.get('/istrue/:name/:id',istrue)
mlModelRouter.get('/isfalse/:id',isfalse)
mlModelRouter.get('/upload/:id',modelhandel)

export default mlModelRouter