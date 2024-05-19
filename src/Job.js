import React, { useState } from 'react'
import AllJobs from './AllJobs'


function Job() {

    const [job,setJob] = useState()

    const [deg, setdeg] = useState()
    const [title, settitle] = useState()
    const [desc, setdesc] = useState()
    const [assigned_date, setassigned_date] = useState()
    const [est_time, setest_time] = useState()
    const [complete_date, setcomplete_date] = useState()
    const [status, setstatus] = useState()


    const addJob=()=>{

    }
 

    const AiTrigger=async()=>{

      try {
        await fetch('https://final-project-2024-2lrl6xovla-de.a.run.app/ai_assign' , {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        }).then((response) => response.json())
        .then((result) => {
        console.log(result)
        })
        .catch(error => {
        console.log(error);
      })
      } catch (error) {
        console.log(error);
      }
    

    try {
      await fetch('https://final-project-2024-2lrl6xovla-de.a.run.app/get_jobs' , {
        method: "GET",
        headers: {
          'Content-type': 'application/json'
        },
      }).then((response) => response.json())
      .then((result) => {
        setJob(result)
      console.log(result)
      })
      .catch(error => {
      console.log(error);
    })
    } catch (error) {
      console.log(error);
    }




  }


    // const addTask=(e)=>{
    //     e.preventDefault();

    //     let taskdata = 
    //     {
    //      "title" : taskTitle ,
    //      "description" : des ,
    //      "tech" : taskTech,
    //      "ideal_skills" : skill
    //     };

    //     if(taskdata.title==="" || taskdata.description === "" || taskdata.tech === "") {
    //         alert('Please fill the required parameters');
    //         return
    //     }

    //     taskdata = JSON.stringify(taskdata)

    //     fetch('https://final-project-2024-2lrl6xovla-de.a.run.app/add_task', {
    //         method: "POST",
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: taskdata
    //         })
    //         .then((response) => response.json())
    //         .then((result) => {
    //         console.log(result)
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    
    // }
   

    // fetch('https://final-project-2024-2lrl6xovla-de.a.run.app/get_unassigned_tasks', {
    //     method: "GET",
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    //     })
    //     .then((response) => response.json())
    //     .then((result) => setTask(result))
    //     .catch(error => {
    //         console.log(error);
    //     })





  return (
      <div className='h-screen bg-black pt-24 text-white'>
    {job ? 
    <div className='w-full p-10  bg-black text-white px-10 '>

    <div className='flex mb-2 '> 
        <h1 className='rounded-sm mr-1 w-28 text-blue-200 '>Name</h1>
        <h1 className='rounded-sm mr-1 w-52 text-red-200 '>Designation</h1>
        <h1 className='rounded-sm mr-1 w-64 text-green-200 '>Title</h1>
        <h1 className='rounded-sm mr-1 w-64 text-yellow-200 '>Description</h1>
        <h1 className='rounded-sm mr-1 w-64 text-purple-200 '>Assigned Date</h1>
        <h1 className='rounded-sm mr-1 w-64 text-cyan-200 '>Estimated Time</h1>
        <h1 className='rounded-sm mr-1 w-64 text-violet-200 '>Completion Date</h1>
        <h1 className='rounded-sm mr-1 w-64 text-slate-200 '>Status</h1>
    </div>  

     <div>   
        { job.map(it => (<AllJobs name={it[0]} deg={it[1]} title={it[2]} desc={it[3]} assign_date={it[4]} estimated_time={it[5]} complete_date={it[6]} status={it[7]}/>)) } 
    </div>

    

    <div className='flex gap-1 text-black'> 
        <input type='text' disabled placeholder='Name' className='rounded-sm w-20' />
        <input type='text' onChange={(e)=>setdeg(e.target.value)} placeholder='Designation' className='rounded-sm w-40' />
        <input type='text' onChange={(e)=>settitle(e.target.value)} placeholder='Title' className='rounded-sm w-52' />
        <input type='text' onChange={(e)=>setdesc(e.target.value)} placeholder='Description' className='rounded-sm w-52' />
        <input type='text' onChange={(e)=>setassigned_date(e.target.value)} placeholder='Assigned Date' className='rounded-sm w-52 ' />
        <input type='text' disabled placeholder='Estimated Time' className='rounded-sm w-52' />
        <input type='text' onChange={(e)=>setcomplete_date(e.target.value)} placeholder='Completion Date' className='rounded-sm w-52 ' />
        <input type='text' onChange={(e)=>setstatus(e.target.value)} placeholder='Status' className='rounded-sm w-52 ' />

        <button className='text-white border-solid border-2 border-white rounded-md w-14 h-10' onClick={addJob}>+</button>
    </div>  
    
     {/* <button className='mx-20 mt-3 border-solid border-2 border-white rounded-md w-14 h-8' onClick={addTask}>+</button> */}
    
    </div>  : <button className='auto_trigger' onClick={AiTrigger}>AI Trigger</button>
  } 
  </div>
  )
}

export default Job
