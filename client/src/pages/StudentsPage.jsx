import { useEffect, useState } from "react"
import { getStudentsRequest } from '../api/students.api.js'

import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Modal from 'react-modal';
import { Link } from 'react-router-dom'

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

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

 

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(()=>{        
        async function loadStudents() {
            const response = await getStudentsRequest()
            setStudents(response.data)
        }
        loadStudents()
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
                        <TableCell align="left"> Edit</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {students.map((student) => (
                        <TableRow
                        key={student.s_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >                        
                        <TableCell align="left">{student.first_name} {student.last_name}</TableCell>
                        <TableCell align="left">{student.email}</TableCell>
                        <TableCell align="left">{student.phone_number}</TableCell>
                        <TableCell align="left">{student.lv_id}</TableCell>
                        <TableCell align="left">{student.group}</TableCell>
                        <TableCell align="left">
                            <select name="plan" id="plan">
                            { student.courses.map((course, i) => 
                            <option key={i} value={course.c_is}>{course.course}</option>
                            )}
                            </select>
                        </TableCell>
                        <TableCell align="left">{ student.status == 1 ? "Activo🗸": "Inactivo🗙"}</TableCell>
                        <TableCell ><button name={student.s_id}><Link to={"/" + student.s_id}>🖉</Link></button></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer> 

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
                <form>
                <input />
                <button>tab navigation</button>
                <button>stays</button>
                <button>inside</button>
                <button>the modal</button>
                </form>
            </Modal>      
        
        </div>
    )
    
}

export default StudentsPage