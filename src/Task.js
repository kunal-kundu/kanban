import React, { useState } from 'react'
import AllTask from './AllTask';

function Task() {

    const [task,setTask] = useState()

    const [taskTitle, setTaskTitle] = useState()
    const [des, setDes] = useState()
    const [taskTech,setTaskTech] = useState()
    const[skill,setSkill] = useState()

    const addTask=(e)=>{
        e.preventDefault();

        let taskdata = 
        {
         "title" : taskTitle ,
         "description" : des ,
         "tech" : taskTech,
         "ideal_skills" : skill
        };

        if(taskdata.title==="" || taskdata.description === "" || taskdata.tech === "") {
            alert('Please fill the required parameters');
            return
        }

        taskdata = JSON.stringify(taskdata)

        fetch('https://final-project-2024-2lrl6xovla-de.a.run.app/add_task', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: taskdata
            })
            .then((response) => response.json())
            .then((result) => {
            console.log(result)
            })
            .catch(error => {
                console.log(error);
            })
    
    }
   

    fetch('https://final-project-2024-2lrl6xovla-de.a.run.app/get_unassigned_tasks', {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
        })
        .then((response) => response.json())
        .then((result) => setTask(result))
        .catch(error => {
            console.log(error);
        })





  return (
      <div className='h-screen bg-black pt-24 text-white'>
    {task ? 
    <div className='w-full p-10  bg-black text-white px-10 '>

    <div className='flex mb-2 '> 
        <h1 className='rounded-sm mr-1 w-28 text-blue-200 '>Task ID</h1>
        <h1 className='rounded-sm mr-1 w-52 text-red-200 '>Title</h1>
        <h1 className='rounded-sm mr-1 w-64 text-green-200 '>Description</h1>
        <h1 className='rounded-sm mr-1 w-64 text-yellow-200 '>Tech</h1>
        <h1 className='rounded-sm mr-1 w-64 text-purple-200 '>Ideal Skills</h1>
        <h1 className='rounded-sm mr-1 w-64 text-slate-200 '>Request Date</h1>
    </div>  

     <div>   
        { task.map(it => (<AllTask id={it[0]} title={it[1]} description={it[2]} tech={it[3]} idealSkill={it[4]} reqDate={it[5]}/>)) } 
    </div>

    

    <form className='flex text-black'> 
        <input type='text' disabled placeholder='Task ID' className='rounded-sm mr-1 w-28 font-bold' />
        <input type='text' onChange={(e)=>setTaskTitle(e.target.value)} placeholder='Title' className='rounded-sm mr-1 w-52 font-bold' />
        <input type='text' onChange={(e)=>setDes(e.target.value)} placeholder='Description' className='rounded-sm mr-1 w-64 font-bold' />
        <input type='text' onChange={(e)=>setTaskTech(e.target.value)} placeholder='Tech' className='rounded-sm mr-1 w-64 font-bold' />
        <input type='text' onChange={(e)=>setSkill(e.target.value)} placeholder='Ideal Skills' className='rounded-sm mr-1 w-64 font-bold' />
        <input type='text' disabled placeholder='Request Date' className='rounded-sm mr-1 w-64 font-bold' />
        <button className='text-white border-solid border-2 border-white rounded-md w-14 h-10' onClick={addTask}>+</button>
    </form>  
    
     {/* <button className='mx-20 mt-3 border-solid border-2 border-white rounded-md w-14 h-8' onClick={addTask}>+</button> */}
    
    </div>  : <h1 className='grid h-screen place-items-center text-4xl' >Loading...</h1>
  } 
  </div>
  )
}

export default Task
