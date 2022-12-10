import React from 'react'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentsPage from './pages/StudentsPage'
import StudentPage from './pages/StudentPage'
import StudentForm from './pages/StudentForm'
import NotFound from './pages/NotFound'
import CoursesPage, {} from './pages/Coursespage'

import Navbar from './components/navbar.jsx'

function App() {
  return (    
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<StudentsPage />} />
      <Route path='/:s_id' element={<StudentPage />} />
      <Route path='/new' element={<StudentForm />} />
      <Route path='/courses' element={<CoursesPage />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App;
