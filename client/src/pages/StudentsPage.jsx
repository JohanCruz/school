import { useEffect, useState } from "react"
import { getStudentsRequest, updateStudentcoursesRequest, getStudentsCoursesRequest } from '../api/students.api.js'
import { Formik, Form } from 'formik'
import { updateStudentRequest } from '../api/students.api.js'

import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MultiSelect } from "react-multi-select-component";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


function StudentsPage() {

    const [students, setStudents] = useState([])
    const [courses, setCourses] = useState([])
    

    useEffect(()=>{        
        async function loadStudents() {
            const response = await getStudentsRequest()
            setStudents(response.data)            
        }
        loadStudents()

        async function loadCourses() {            
            const response2 = await getStudentsCoursesRequest()
            setCourses(response2.data)
            
        }
        loadCourses()
    }, [])
    return(
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone number</TableCell>
                        <TableCell>Group</TableCell>
                        
                        
                        <TableCell align="left">Level id</TableCell>
                        <TableCell align="left">Courses</TableCell>
                        <TableCell align="left">Status</TableCell>


                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {students.map((student) => (
                        <TableRow key={student.s_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>                        

                        <TableCell align="left">
                        <Formik
                            initialValues={{
                                first_name: student.first_name,
                                last_name: student.last_name
                            }}
                            onSubmit = {async(values, actions) => {
                                console.log(values);
                                try {
                                    const response = await updateStudentRequest(values, student.s_id);
                                    console.log(response)
                                    
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                            }
                        >
                            {({handleChange, handleSubmit, values, isSubmitting}) => (
                                <Form onSubmit={handleSubmit}>

                                    <input type="text" name="first_name" placeholder='Write the first name' 
                                        onChange={handleChange} value={values.first_name} required
                                        style={{ width: "100px" }}
                                    />
                                    <input type="text" name="last_name" placeholder='Write the last name' 
                                        onChange={handleChange} value={values.last_name} required
                                        style={{ width: "100px" }}
                                    />
                                    <button type='submit' disabled={isSubmitting}>
                                        { isSubmitting ? "Saving..." : "💾" }
                                    </button>

                                </Form>
                            )}    
                        </Formik>

                        </TableCell>
                        <TableCell align="left">

                        <Formik
                            initialValues={{
                                email: student.email
                            }}
                            onSubmit = {async(values, actions) => {
                                console.log(values);
                                try {
                                    const response = await updateStudentRequest(values, student.s_id);
                                    console.log(response)
                                    
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                            }
                        >
                            {({handleChange, handleSubmit, values, isSubmitting}) => (
                                <Form onSubmit={handleSubmit}>

                                    <input type="text" name="email" placeholder='Write the email' 
                                        onChange={handleChange} value={values.email} required
                                        style={{width: "160px"}}
                                        />
                                    <button type='submit' disabled={isSubmitting}>
                                        { isSubmitting ? "Saving..." : "💾" }
                                    </button>

                                </Form>
                            )}    
                        </Formik>
                        
                        </TableCell>
                        <TableCell align="left">
                        <Formik
                            initialValues={{
                                phone_number: student.phone_number
                            }}
                            onSubmit = {async(values, actions) => {
                                console.log(values);
                                try {
                                    const response = await updateStudentRequest(values, student.s_id);
                                    console.log(response)
                                    
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                            }
                        >
                            {({handleChange, handleSubmit, values, isSubmitting}) => (
                                <Form onSubmit={handleSubmit}>

                                    <input type="text" name="phone_number" placeholder='Write the phone number' 
                                        onChange={handleChange} value={values.phone_number} required
                                        style={{width: "160px"}}
                                        />
                                    <button type='submit' disabled={isSubmitting}>
                                        { isSubmitting ? "Saving..." : "💾" }
                                    </button>

                                </Form>
                            )}    
                        </Formik>
                            
                        </TableCell>
                        <TableCell align="left">{student.lv_id}</TableCell>
                        <TableCell align="left">{student.group}</TableCell>
                        <TableCell align="left">
                            <MultipleSelect courses={courses} student={student}/>
                        </TableCell>
                        <TableCell align="left">{ student.status == 1 ? "Activo🗸": "Inactivo🗙"}</TableCell>
                        
                                 
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer> 
        </div>
    )
    
}

export default StudentsPage


const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry", disabled: true },
  ];
  
  const MultipleSelect = (props) => {
    


    const op = props.courses
    const s_id = props.student.s_id
    let s_c = props.student.courses

    const c_id_array = []

    for (let i = 0; i < s_c.length; i++) {        
        c_id_array.push(s_c[i].value)        
    }

    for (let i = 0; i < op.length; i++) {
        if(op[i].value in c_id_array){
            op[i]['selected']= true
            op[i]['checked']= true
        }
        
    }


    console.log('s_c', s_c)
    const [selected, setSelected] = useState(s_c);
    
    

    
  
    return (
      <div>
        { selected.map((course, i) =>
            <li key={i} hidden= { course.label == "" ? true : false }>
                { course.label == "" ? "-" : course.label }
            </li>
        )}      

        <Formik
            initialValues={{
                courses: selected
            }}
            onSubmit = {async(values, actions) => {
                console.log('selected', selected);
                try {
                    const response = await updateStudentcoursesRequest(selected, s_id);
                    console.log("response", response)
                    s_c = selected
                    
                } catch (error) {
                    console.log(error);
                }
            }
            }
        >
            {({handleChange, handleSubmit, values, isSubmitting}) => (                
                <Form onSubmit={handleSubmit}>

                <MultiSelect
                        options={op}
                        value={selected}
                        defaultValue={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                        />
                    <button type='submit'>
                        { "💾" }
                    </button>
                </Form>
            )}    
        </Formik>
                         
        
        </div>
      
    );
  };
  