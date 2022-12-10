import { useEffect, useState } from "react"
import { Formik, Form } from 'formik'
import { getCoursesRequest, updateCourseRequest } from '../api/students.api.js'

import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function CoursesPage() {

    const [courses, setCourses] = useState([])
    

    useEffect(()=>{

        async function loadCourses() {            
            const response = await getCoursesRequest()
            setCourses(response.data)
            
        }
        loadCourses()

    }, [])
    return(
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Name & credits</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {courses.map((course) => (
                        <TableRow key={course.c_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>                        

                        <TableCell align="left">
                        <Formik
                            initialValues={{
                                name: course.name,
                                credits: course.credits
                            }}
                            onSubmit = {async(values, actions) => {
                                console.log(values);
                                try {
                                    const response = await updateCourseRequest(values, course.c_id);
                                    console.log(response)
                                    
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                            }
                        >
                            {({handleChange, handleSubmit, values, isSubmitting}) => (
                                <Form onSubmit={handleSubmit}>

                                    <input type="text" name="name" placeholder='name' 
                                        onChange={handleChange} value={values.name} required
                                        style={{ width: "250px" }}
                                    />
                                    <input type="number" name="credits" placeholder='Credits' 
                                        onChange={handleChange} value={values.credits} required
                                        style={{ width: "100px" }}
                                    />
                                    <button type='submit' disabled={isSubmitting}>
                                        { isSubmitting ? "Saving..." : "💾" }
                                    </button>

                                </Form>
                            )}    
                        </Formik>

                        </TableCell>  
                                 
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer> 
        </div>
    )
    
}

export default CoursesPage


