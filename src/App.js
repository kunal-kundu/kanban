import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomKanban } from './CustomKanban'
import Navbar from './Navbar';
import Employee from './Employee';
import Task from './Task';
import Job from './Job';
import Kanban from './Kanban';


export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        
          <Route path="/" element={<Job />} />
          <Route path='/employees' element={<Employee/>}/> 
          <Route path='/task' element={<Task/>}/>
          <Route path='/kanban' element={<Kanban/>}/>
      </Routes>
    </BrowserRouter>
  )
}
