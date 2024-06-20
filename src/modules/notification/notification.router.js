import express from 'express'
import { deleteNotificaiton, notification, redirectNotification } from './notification.controller.js'
const notificationRouter = express.Router()

notificationRouter.get('/notification',notification)
notificationRouter.get('/deleteNotification/:id',deleteNotificaiton)
notificationRouter.get("/redirectNotification/:id", redirectNotification);
export default notificationRouter



