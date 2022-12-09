import { Router } from 'express'
import { getStudents, createStudent, updateStudent , deleteStudent,updateStudentcourses, getStudent, getStudentcourses } from './../controllers/students.controller.js'

const router = Router()

router.get('/students', getStudents)
router.get('/students/courses/', getStudentcourses)
router.get('/students/:s_id', getStudent)
router.post('/students', createStudent)
router.patch('/students/:s_id', updateStudent)

router.patch('/students/courses/:s_id', updateStudentcourses)
router.delete('/students/:s_id', deleteStudent)

export default router