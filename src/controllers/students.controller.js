import { conn } from '../../db/db.js'

export const getStudents = async(req, res) => {
    try {
        //const [result] = await conn.query('SELECT * from test_students')
        const query = `SELECT test_students.s_id, test_students.first_name, test_students.last_name, test_students.email, test_students.lv_id, 
        test_students.group, GROUP_CONCAT(test_courses.name) AS courses, GROUP_CONCAT(test_courses.c_id) AS c_id, test_students.status, 
        test_students.phone_number  FROM test_students LEFT JOIN test_courses_x_student ON test_students.s_id = test_courses_x_student.s_id
        LEFT JOIN test_courses ON test_courses_x_student.c_id = test_courses.c_id
        group BY test_students.s_id`
        const [result] = await conn.query(query)
        for (let i = 0; i < result.length; i++) {
            if(result[i].courses){
                const courses = result[i].courses.split(',')
                const c_id = result[i].c_id.split(',')                
                const coursesList = []
                for (let j = 0; j < courses.length; j++) {
                    const coursesObject = {}
                    coursesObject['label'] = courses[j];
                    coursesObject['value'] = c_id[j];
                    coursesList.push(coursesObject)
                }                
                result[i].courses =  coursesList; 
            } else {
                result[i].courses =  [{'label':'', 'value':'' }]
            } 
                       
        }
        
        res.json(result)
    } catch (error) {
       return res.status(500).json({
        message:'Somethings goes wrong'
        }) 
    }   
}

export const getStudent = async(req, res) => {
    try {
        //const [rows] = await conn.query('SELECT * from test_students where s_id = ?', req.params.s_id)
        const query = `SELECT test_students.s_id, test_students.first_name, test_students.last_name, test_students.email, test_students.lv_id, 
        test_students.group, GROUP_CONCAT(test_courses.name) AS label, GROUP_CONCAT(test_courses.c_id) AS value, test_students.status, 
        test_students.phone_number  FROM test_students LEFT JOIN test_courses_x_student ON test_students.s_id = test_courses_x_student.s_id
        LEFT JOIN test_courses ON test_courses_x_student.c_id = test_courses.c_id  WHERE test_students.s_id = ?
        group BY test_students.s_id`
        const [rows] = await conn.query(query, req.params.s_id)
        if (rows.length <= 0) return res.status(404).json({
            message: 'student not found'
        })
        rows[0].courses = rows[0].courses.split(',')       
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message:'Somethings goes wrong'
            }) 
    }
}

export const createStudent = async(req, res) => {
    try {
        const {first_name, email} = req.body
        const [rows] = await conn.query('INSERT INTO test_students (first_name, email) VALUES (?, ?)', [first_name, email])
        res.send({
            id: rows.insertId,
            first_name: first_name,
            email: email
        })
    } catch (error) {
        return res.status(500).json({
            message:'Somethings goes wrong'
            })
    }
}
export const getStudentcourses = async(req, res) => {

    try {
        const [rows] = await conn.query('SELECT * from test_courses')

        const response = []
        for (let i = 0; i < rows.length; i++) {        
            response.push({label: rows[i].name, value: rows[i].c_id, credits: rows[i].credits })        
        }
        res.json(response)
    } catch (error) {
       return res.status(500).json({
        message:'Somethings goes wrong'
        }) 
    }     

}

export const updateStudent = async(req, res) => {
    const {first_name, last_name, email, phone_number} = req.body   
    const [result] = await conn.query('UPDATE test_students SET first_name= IFNULL(?, first_name), last_name= IFNULL(?, last_name), email = IFNULL(?, email), phone_number = IFNULL(?, phone_number) WHERE s_id = ?', 
    [first_name, last_name, email, phone_number, req.params.s_id])
    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'student not found'
    })

    const [rows] = await conn.query('SELECT * from test_students where s_id = ?', req.params.s_id)
    res.json(rows[0])
}

export const updateStudentcourses = async(req, res) => {
    const courses = req.body    

    const [result] = await conn.query('DELETE from test_courses_x_student where s_id = ?', req.params.s_id)
    
    for (let i = 0; i < courses.length; i++) {
        await conn.query('INSERT INTO test_courses_x_student (s_id,  c_id) VALUES(?, ?) ', [req.params.s_id, courses[i].value])    
    } 
    
    
    const [rows] = await conn.query('SELECT * from test_courses_x_student where s_id = ?', req.params.s_id)
    res.json(rows[0])
}

export const deleteStudent = async(req, res) => {
    try {
        const [result] = await conn.query('DELETE from test_students where s_id = ?', req.params.s_id)
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'student not found'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message:'Somethings goes wrong'
            })
    }
}