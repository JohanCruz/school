import { conn } from '../../db/db.js'

export const getList = async(req, res) => {
    const [result] = await conn.query('SELECT * from test_students')
    res.json(result)
}