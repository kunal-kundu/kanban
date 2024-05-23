import React,{useState,useEffect} from 'react'
import { FaExpand } from 'react-icons/fa';
import { motion } from "framer-motion";
import DropArea from './DropArea';

export default function Kanban() {
    const [cards, setCards] = useState();
    const [activeCard, setActiveCard] = useState(null)

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

    const onDrop =(status, position)=>{
      console.log(`${activeCard} is going to place into ${status} and the position ${position}`);

      //call api here to make any changes
      
      // if(activeCard == null || activeCard === undefined) return;

      // const taskToMove = cards[activeCard];
      // const UpdatedTask = cards.filter((task,index) => index !== activeCard)

      // UpdatedTask.splice(position,0, {
      //   ...taskToMove,
      //   status: status
      // })

      // setCards(UpdatedTask)

    }

  return (
    <div className='w-full h-screen bg-black text-white '>
    {cards ? 
    <div  className='flex gap-3 p-12 pt-28 bg-black ' > 
    <Colum title="not_started" cards={cards} color="yellow" setActiveCard={setActiveCard} onDrop={onDrop}/>
    <Colum title="inProgress" cards={cards} color="red" setActiveCard={setActiveCard} onDrop={onDrop}/>
    <Colum title="suspended" cards={cards} color="cyan" setActiveCard={setActiveCard} onDrop={onDrop}/>
    <Colum title="completed" cards={cards} color="green" setActiveCard={setActiveCard} onDrop={onDrop}/>
    <h1>activeCard - {activeCard}</h1>
    </div> 
    : <h1 className='grid h-screen place-items-center text-4xl'>Loading...</h1> 
    }
    </div>
  )
}

const Colum=({title,cards,color,setActiveCard,onDrop})=>{
  const ti = title
  //console.log(ti);

    return (
    <div classname='bg-neutral-800 p-5 '>
        <h1 className={`pl-4 text-${color}-200`}>{title[0].toUpperCase() + title.substring(1,title.length)}</h1>
      <DropArea onDrop={()=>onDrop(title,0)}/>
        {cards.map((it)=>  {if(it[7]===ti) { 
           return <>
           <Card  name={it[0]} deg={it[1]} title={it[2]}
            desc={it[3]} day={it[4]} time={it[5]} status={it[7]} 
            setActiveCard={setActiveCard} />
            <DropArea onDrop={()=>onDrop(title,1)}/>
           </>
         }  }  )}
        <Card setActiveCard={setActiveCard} />
    </div>
    )
}

const Card=(props)=>{

  const [show, setShow] = useState(false)

  const Modal=(props)=>{
    return (
      <div className='modal-wrapper'>
        <div className='modal-container'>
          <p>1. Employee Name:  {props.props.name}</p>
          <p>2. Designation:  {props.props.deg}</p>
          <p>3. Task:  {props.props.title}</p>
          <p>4. Task Description:  {props.props.desc}</p>
          <p>5. Date:  {props.props.day}</p>
          <p>6. Estimated_time:  {props.props.time}</p>
          <p>7. status:  {props.props.status}</p>
          <button className="red-button" onClick={()=>setShow(!show)}>close</button>
      </div>
      </div>
    )
  }

  
    return ( 
    
<>
    <div draggable onDragStart={()=>props.setActiveCard(props.title)} onDragEnd={()=>props.setActiveCard(null)} 
    className='task_card cursor-grab p-2 m-2 rounded-md bg-neutral-800 active:cursor-grabbing w-72 h-24 overflow-hidden' >
    
      {props.title && <p>Task: {props.title}, <br/>
      assigned to: {props.name}, <br/>
      estimated_time: {props.time} days</p>
      }
    
      <button  onClick={()=>setShow(true)} className='expand'><FaExpand/></button>
      {show &&  <Modal props={props}/>}
    </div>
    
    </>
    
    )
}

