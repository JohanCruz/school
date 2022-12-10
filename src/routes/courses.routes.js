import { Router } from 'express'
import { getCourses, updateCourse } from './../controllers/courses.controller.js'

const router = Router()

router.get('/courses', getCourses)
router.patch('/courses/:c_id', updateCourse)


export default router