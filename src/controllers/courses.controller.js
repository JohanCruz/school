import { conn } from '../../db/db.js'

export const getCourses = async(req, res) => {
    try {
        const [result] = await conn.query('SELECT * from test_courses')
        res.json(result)
    } catch (error) {
        return res.status(500).json({
            message:'Somethings goes wrong'
        })  
    }
}

export const updateCourse = async(req, res) => {
    try {
        const {name, credits} = req.body
        const query = 'UPDATE test_courses SET name = IFNULL(?, name), credits = IFNULL(?, credits) WHERE c_id= ?'
        const [result] = await conn.query(query, [name, credits, req.params.c_id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'student not found'
        })
        res.json(result)
    } catch (error) {
        return res.status(500).json({
            message:'Somethings goes wrong',
            error: error
        })  
    }
}