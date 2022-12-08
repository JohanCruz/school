import axios from 'axios'

export const getStudentsRequest =  async(student) => await axios.get('http://localhost:3000/api/students')

export const createStudentRequest =  async(student) => await axios.post('http://localhost:3000/api/students', student)