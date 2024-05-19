import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa';




function AllTask(props) {

  const[show,setShow] = useState(false)

  const Modal=(props)=>{

    const deleteTask=(id)=>{

      try {
        fetch(`https://final-project-2024-2lrl6xovla-de.a.run.app/delete_task/${id}`, {
          method: "DELETE",
          headers: {
              'Content-type': 'application/json'
          },
          })
          .then((response) => response.json())
          .then((result) => {
          console.log(result)
          })
          .catch(error => {
              console.log(error);
          })
      } catch (error) {
        console.log(error);
      }
      finally{
          setShow(false)
      }
  }

    return (
    <div className='modal-wrapper'>
      <div className='modal-container'>
        <h1>Are you Sure You want to delete this task</h1>
        <button className='green-button' onClick={()=>deleteTask(props.id)}>YES</button>
        <button className='red-button' onClick={()=>setShow(false)}>NO</button>
    </div>
    </div>
    )
  }


    

  return (
    <div className='flex'>
    

    <div className='bg-neutral-800 rounded-md mb-3 mr-1 w-28 h-20 p-1'>
      <p>T000{props.id}</p>
    </div>

    <div className='bg-neutral-800 rounded-md mb-3 mr-1 w-52 h-20 p-1'>
      <parent>{props.title}</parent>
    </div>

    <div className='bg-neutral-800 rounded-md mb-3 mr-1 w-64 h-20 p-1'>
      <p>{props.description}</p>
    </div>

    <div className='bg-neutral-800 rounded-md mb-3 mr-1 w-64 h-20 p-1'>
      <p>{props.tech}</p>
    </div>

    <div className='bg-neutral-800 rounded-md mb-3 mr-1 w-64 h-20 p-1'>
      <p>{props.idealSkill}</p>
    </div>

    <div className='bg-neutral-800 rounded-md mb-3 mr-1 w-64 h-20 p-1'>
      <p>{props.reqDate}</p>
    </div>

    {/* <button className='w-9 h-9 border-2 border-solid m-1 rounded-md p-2' value={props.id} onClick={()=>deleteTask(props.id)}><FaTrash/></button> */}

    <button className='w-9 h-9 border-2 border-solid m-1 rounded-md p-2' value={props.id} onClick={()=>setShow(!show)}><FaTrash/></button>

    {show && <Modal id={props.id}/>}


    </div>
  )
}

export default AllTask
