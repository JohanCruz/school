import { Formik, Form } from 'formik'
import { createStudentRequest } from '../api/students.api.js'

function StudentForm() {
    return(
        <div>
            <Formik
            initialValues={{
                first_name: "",
                email: "",
                phone_number:""
            }}
            onSubmit = {async(values, actions) => {
                console.log(values);
                try {
                    const response = await createStudentRequest(values);
                    console.log(response)
                    actions.resetForm()
                    
                } catch (error) {
                    console.log(error);
                }
            }
            }
            >
            {({handleChange, handleSubmit, values, isSubmitting}) => (
                <Form onSubmit={handleSubmit}>
                    <label>First name</label>
                    <input type="text" name="first_name" placeholder='Write the first name' 
                    onChange={handleChange} value={values.first_name} required
                    />
                    <label>Email</label>
                    <input type="text" name="email" placeholder='Write the email' 
                    onChange={handleChange} value={values.email} required
                    />
                    <label>Phone number</label>
                    <input type="text" name="phone_number" placeholder='Write the phone number' 
                    onChange={handleChange} value={values.phone_number} required
                    />
                    <button type='submit' disabled={isSubmitting}>
                        { isSubmitting ? "Saving..." : "Save" }
                    </button>
                </Form>
            )}    
            </Formik>
        </div>
    )
}

export default StudentForm