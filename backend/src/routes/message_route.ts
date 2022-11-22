import express from 'express'
const router = express.Router()
import message from '../controllers/message'

router.get('/', message.getMessages)

router.post('/', message.sendMessage)

export = router