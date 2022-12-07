import { Router } from 'express'
import { getList } from './../controllers/index.controller.js'



const router = Router()

router.get('/ping', getList);


export default router