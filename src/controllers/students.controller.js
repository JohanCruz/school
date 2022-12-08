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
                    coursesObject['course'] = courses[j];
                    coursesObject['c_id'] = c_id[j];
                    coursesList.push(coursesObject)
                }                
                result[i].courses =  coursesList; 
            } else {
                result[i].courses =  [{'course':'', 'c_id':'' }]
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
        test_students.group, GROUP_CONCAT(test_courses.name) AS courses, GROUP_CONCAT(test_courses.c_id) AS c_id, test_students.status, 
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

export const updateStudent = async(req, res) => {
    const {first_name, email} = req.body
    console.log('s_id', req.params.s_id, first_name, email)
    const [result] = await conn.query('UPDATE test_students SET first_name= IFNULL(?, first_name), email = IFNULL(?, email) WHERE s_id = ?', [first_name, email, req.params.s_id])
    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'student not found'
    })

    const [rows] = await conn.query('SELECT * from test_students where s_id = ?', req.params.s_id)
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