import { Router } from 'express'
import { getStudents, createStudent, updateStudent , deleteStudent, getStudent } from './../controllers/students.controller.js'

const router = Router()

router.get('/students', getStudents)
router.get('/students/:s_id', getStudent)
router.post('/students', createStudent)
router.patch('/students/:s_id', updateStudent)
router.delete('/students/:s_id', deleteStudent)

export default router