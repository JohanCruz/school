import { conn } from '../../db/db.js'

export const getStudents = async(req, res) => {
    try {
        const [result] = await conn.query('SELECT * from test_students')
        res.json(result)
    } catch (error) {
       return res.status(500).json({
        message:'Somethings goes wrong'
        }) 
    }   
}

export const getStudent = async(req, res) => {
    try {
        const [rows] = await conn.query('SELECT * from test_students where s_id = ?', req.params.s_id)
        if (rows.length <= 0) return res.status(404).json({
            message: 'student not found'
        })
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