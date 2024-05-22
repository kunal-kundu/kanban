import React,{useState,useEffect} from 'react'
import { FaExpand } from 'react-icons/fa';
import { motion } from "framer-motion";

export default function Kanban() {
    const [cards, setCards] = useState();
  fetch(`https://final-project-2024-2lrl6xovla-de.a.run.app/get_jobs`, {
          method: "GET",
          headers: {
              'Content-type': 'application/json'
          },
          })
          .then((response) => response.json())
          .then((result) => {
          //console.log(result);
          setCards(result);
          })
          .catch(error => {
              console.log(error);
          })

  return (
    <div className='w-full h-screen bg-black text-white '>
    {cards ? 
    <div  className='flex gap-3 p-12 pt-28 bg-black ' > 
    <Colum title="not_started" cards={cards} color="yellow"/>
    <Colum title="inProgress" cards={cards} color="red"/>
    <Colum title="suspended" cards={cards} color="cyan"/>
    <Colum title="completed" cards={cards} color="green"/>
    </div> 
    : <h1 className='grid h-screen place-items-center text-4xl'>Loading...</h1> 
    }
    </div>
  )
}

const Colum=({title,cards,color})=>{
  const ti = title
  //console.log(ti);

    return (
    <div classname='bg-neutral-800 p-5 '>
        <h1 className={`pl-4 text-${color}-200`}>{title[0].toUpperCase() + title.substring(1,title.length)}</h1>
        {cards.map((it)=>  {if(it[7]===ti) {  return <Card  name={it[0]} deg={it[1]} title={it[2]} desc={it[3]} day={it[4]} time={it[5]} status={it[7]}/> }}  )}
        <Card/>
    </div>
    )
}

const Card=(props)=>{

  const [show, setShow] = useState(false)

  const Modal=(props)=>{
    return (
      <div className='modal-wrapper'>
        <div className='modal-container'>
          <p>1. Employee Name : {props.props.name}</p>
          <p>2. Designation : {props.props.deg}</p>
          <p>3. Task : {props.props.title}</p>
          <p>4. Task Description : {props.props.desc}</p>
          <p>5. Date : {props.props.day}</p>
          <p>6. Estimated_time : {props.props.time}</p>
          <p>7. status : {props.props.status}</p>
          <button className="red-button" onClick={()=>setShow(!show)}>close</button>
      </div>
      </div>
    )
  }

  
    return ( 
    <motion.div draggable="true">

    <div className='cursor-grab p-2 m-2 rounded-md bg-neutral-800 active:cursor-grabbing w-72 h-24 overflow-hidden' >
    
      {props.title && <p>Task: {props.title}, <br/>
      assigned to: {props.name}, <br/>
      estimated_time: {props.time} days</p>
      }
    
      <button  onClick={()=>setShow(true)} className='expand'><FaExpand/></button>
      {show &&  <Modal props={props}/>}
    </div>
    </motion.div>
    )
}

