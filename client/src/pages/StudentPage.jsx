import { useEffect, useState } from "react"
import { getStudentsRequest } from '../api/students.api.js'

import {
    useParams
  } from "react-router-dom";

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


function StudentPage() {

    let { s_id } = useParams();
    useEffect(()=>{        
        async function loadStudent() {
            const response = await getStudentsRequest()
            setStudents(response.data)
        }
        loadStudent()
    }, [])


    return(
        <div>
            <h1>{s_id}</h1>        
        </div>
    )
    
}

export default StudentPage