import { Formik, Form } from 'formik'
import { createStudentRequest } from '../api/students.api.js'
import { useEffect, useState } from "react"
import { getStudentsCoursesRequest } from '../api/students.api.js'
import { MultiSelect } from "react-multi-select-component";

function StudentForm() {    
    const [courses, setCourses] = useState([])
    const [selected, setSelected] = useState([]);
    useEffect(()=>{  
        async function loadCourses() {            
            const response2 = await getStudentsCoursesRequest()
            setCourses(response2.data)
            
        }
        loadCourses()
    }, [])
    return(
        <div>
            <Formik
            initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                phone_number:"",
                lv_id: "",
                group: "",
                status: 1,
                selected: ""
            }}
            onSubmit = {async(values, actions) => {
                console.log('values',values);
                try {
                    values.selected = selected
                    const response = await createStudentRequest(values);
                    console.log(response)
                    setSelected([])
                    actions.resetForm()
                    
                } catch (error) {
                    console.log(error);
                }
            }
            }
            >
            {({handleChange, handleSubmit, values, isSubmitting}) => (
                <Form onSubmit={handleSubmit}>
                    <div  style={{display: 'inline-block', marginTop:30}}>
                        <div  style={{position: 'relative', width:190}}>
                            <label>First name</label>
                            <input type="text" name="first_name" placeholder='Write the first name' 
                            onChange={handleChange} value={values.first_name} required style={{width:160 , marginBottom:20}}
                            />
                            <label style={{marginTop:130}}>Last name</label>
                            <input type="text" name="last_name" placeholder='Write the last name' 
                            onChange={handleChange} value={values.last_name} required style={{width:160}}
                            />
                        </div>
                    </div>                    
                    <div  style={{display: 'inline-block', marginTop:30}}>
                        <div style={{position: 'relative', width:190}}>
                            <label style={{position: 'relative'}}>Email</label>
                            <input type="email" name="email" placeholder='Write the email'  
                            onChange={handleChange} value={values.email} required  style={{ marginBottom:20}}
                            />
                            <label style={{position: 'relative'}}>Phone number</label>
                            <input type="text" name="phone_number" placeholder='Write the phone number' 
                            onChange={handleChange} value={values.phone_number} required style={{position: 'relative'}}
                            />
                        </div>
                    </div>                    
                    <div  style={{display: 'inline-block', marginTop:30}}>
                        <div style={{position: 'relative', width:100, marginLeft:50 }}>
                            <label style={{position: 'relative'}}>Level id</label>
                            <input type="number" name="lv_id" placeholder='Level id' 
                            onChange={handleChange} value={values.lv_id} required style={{position: 'relative', width:70,  marginBottom:20}}
                            />
                            <label style={{position: 'relative'}}>Group</label>
                            <input type="text" name="group" placeholder='Group' 
                            onChange={handleChange} value={values.group} required style={{position: 'relative', width:80}}
                            />
                        </div>
                    </div>
                    <div  style={{display: 'inline-block', marginTop:30}}>
                        <div style={{position: 'relative', width:90, marginLeft:0}}>
                            <label style={{position: 'relative'}}>Status</label>
                            <select name="status" onChange={handleChange} value={values.status}>
                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option>
                            </select>
                        </div>
                    </div>
                    <div  style={{display: 'inline-block', marginTop:30}}>
                        <div style={{position: 'relative', width:290, marginLeft:0}}>
                            <label style={{position: 'relative'}}>Courses</label>                            
                            <Courses courses={courses} selected= {selected} setSelected={setSelected} />
                        </div>
                    </div>

                    
                    <button type='submit' disabled={isSubmitting} style={{width:190, marginTop:30, marginLeft:15, position: 'relative' }}>
                        { isSubmitting ? "💾 Saving..." : "💾 Save" }
                    </button>
                </Form>
            )}    
            </Formik>
        </div>
    )
}

export default StudentForm;


  
const Courses = (props) => {
    
    const options = props.courses
    const selected = props.selected
    const setSelected = props.setSelected
  
    return (
      <div>
        { selected.map((course, i) =>
            <li key={i} hidden= { course.label == "" ? true : false }>
                { course.label == "" ? "-" : course.label }
            </li>
        )} 
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
        />
      </div>
    );
  };

