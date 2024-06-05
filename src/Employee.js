import React, { useState } from 'react'
import EmployeeId from './EmployeeId'



function Employee() {

    const [name, setname] = useState('')
    const [deg, setdeg] = useState('')
    const [skill,setskill] = useState('')
    const [count, setcount] = useState(0)
    const [check, setcheck] = useState([])
    const [employee, setEmployee] = useState()
    
    const addEmployee = () =>{
        let employeeData = 
        {
         "name" : name ,
         "designation" : deg ,
         "skills" :  skill,
         "active_project_count" : count
        };

        if(employeeData.name==="" || employeeData.designation ==="" || employeeData.skills==="" ){
            alert('Please fill the required parameters')
            return
        }

        employeeData = JSON.stringify(employeeData)
        
       try{
        fetch('https://final-project-2024-2lrl6xovla-de.a.run.app/add_employee', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: employeeData
            })
            .then((response) => response.json())
            .then((result) => {
            console.log(result)
            })
            .catch(error => {
                console.log(error);
            })
        }
        catch(err){console.log(err);}
    
    }

    // const deleteEmployees = (e) =>{
    //     e.preventDefault();
    //     fetch('https://final-project-2024-2lrl6xovla-de.a.run.app/delete_employee_batch', {
    //         method: "DELETE",
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify(check)
    //         })
    //         .then((response) => response.json())
    //         .then((result) => {
    //         console.log(result)
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
        
    // }

    fetch('https://final-project-2024-2lrl6xovla-de.a.run.app/get_employees', {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
        })
        .then((response) => response.json())
        .then((result) => setEmployee(result))
        .catch(error => {
            console.log(error);
        })
    
    
    //     setname('')
    //     setdeg('')
    //     setskill('')
    //     setcount(0)
   


  return (
    <div className='h-screen bg-black w-full pt-24 text-white '>
    {employee ? 
    <div className='w-full bg-black text-white px-52 p-10'>

    <div className='flex mb-2 text-l'> 
        <h1 className='rounded-sm mr-1 w-28 text-blue-200 '>Emp ID</h1>
        <h1 className='rounded-sm mr-1 w-52 text-yellow-200 '>Employee Name</h1>
        <h1 className='rounded-sm mr-1 w-64 text-red-200 '>Designation</h1>
        <h1 className='rounded-sm mr-1 w-64 text-green-200 '>Employee Skills</h1>
        <h1 className='rounded-sm mr-1 w-32 text-slate-200 '>Active Project Count</h1>
    </div>     

     <div>   
        { employee.map(it => (<EmployeeId id={it[0]} name={it[1]} deg={it[2]} skill={it[3]} projects={it[4]}/>)) } 
    </div>

    <div className='flex text-black'> 
        <input type='text' disabled placeholder='Employee ID' className='rounded-sm mr-1 w-28 ' />
        <input type='text' onChange={(e)=>setname(e.target.value)} placeholder='Employee Name' className='rounded-sm mr-1 w-52 ' />
        <input type='text' onChange={(e)=>setdeg(e.target.value)} placeholder='Designation' className='rounded-sm mr-1 w-64 ' />
        <input type='text' onChange={(e)=>setskill(e.target.value)} placeholder='Employee Skills' className='rounded-sm mr-1 w-64 ' />
        <input type='number' onChange={(e)=>setcount(e.target.value)} placeholder='Active Project Count' className='rounded-sm mr-1 w-32 ' />
        <button className='text-white border-solid border-2 border-white rounded-md w-14 h-10' onClick={addEmployee}>+</button>
    </div>  
    
    </div>  : <h1 className='grid h-screen place-items-center text-4xl' >Loading...</h1>
  } 
  </div>
  )
}

export default Employee
