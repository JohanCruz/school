import axios from 'axios'

export const getStudentsRequest =  async() => await axios.get('http://localhost:3000/api/students')

export const createStudentRequest =  async(student) => await axios.post('http://localhost:3000/api/students', student)

export const updateStudentRequest =  async(student,s_id) => await axios.patch('http://localhost:3000/api/students/'+s_id, student)

export const updateStudentcoursesRequest =  async(student,s_id) => await axios.patch('http://localhost:3000/api/students/courses/'+s_id, student)

export const getStudentsCoursesRequest =  async() => await axios.get('http://localhost:3000/api/students/courses/')