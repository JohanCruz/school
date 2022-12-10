import express from 'express'

import studentsRoutes from './routes/students.routes.js'
import coursesRoutes from './routes/courses.routes.js'
import indexRoutes from './routes/index.routes.js'
import cors from 'cors'
 
const app = express()

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json())

app.use(indexRoutes)
app.use('/api', studentsRoutes)
app.use('/api', coursesRoutes)


app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    })
})

export default app