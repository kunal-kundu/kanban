import React,{useState,useEffect} from 'react'
import { FaExpand, FaTrash } from 'react-icons/fa';
import { FaFire } from "react-icons/fa";
import { motion } from "framer-motion";
import DropArea from './DropArea';

export default function Kanban() {
    const [cards, setCards] = useState();
    const [activeCard, setActiveCard] = useState(null)
    const [activeID, setactiveID] = useState()

    useEffect(() => {
      
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

    }, [])
    
  

  const onDrop =(title)=>{
      console.log(`${activeCard} is going to ${title}`);

      
      let newCards = cards;
      newCards.map((it)=>{
        if(it[8]===activeCard){
          it[7]=title;
        }
      })
      // console.log(newCards);
       setCards(newCards);
      // console.log(cards);

      try
{
      let update_api = {"status" : title}
      fetch(`https://final-project-2024-2lrl6xovla-de.a.run.app/update_job/${activeCard}`,{
        method:'PUT',
        headers: {
          'Content-type': 'application/json'
      },
      body : JSON.stringify(update_api)
    })
      .then((response) => response.json())
      .then((result) => {
      })
      .catch(error => {
          console.log(error);
      })
      }
      catch(err){
      console.log(err);
      }
      


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
    <div className='w-full h-screen bg-black text-white place-items-center'>
    {cards ? 
    <div  className='flex gap-3 p-12 pt-28 bg-black ' > 
    <Colum title="not_started" tag="Not Started" cards={cards} color="yellow" setActiveCard={setActiveCard} onDrop={onDrop} setactiveID={setactiveID} />
    <Colum title="inProgress" tag="In Progress" cards={cards} color="red" setActiveCard={setActiveCard} onDrop={onDrop} setactiveID={setactiveID}/>
    <Colum title="completed" tag="Completed" cards={cards} color="green" setActiveCard={setActiveCard} onDrop={onDrop} setactiveID={setactiveID}/>
    {/* <Colum title="suspended" tag="Suspended" cards={cards} color="cyan" setActiveCard={setActiveCard} onDrop={onDrop} setactiveID={setactiveID}/> */}
    <ColumDel title="removed" tag="Removed" cards={cards} color="red" setActiveCard={setActiveCard} onDrop={()=>onDrop("removed")} setactiveID={setactiveID}/>

    </div> 
    : <h1 className='grid h-screen place-items-center text-4xl'>Loading...</h1> 
    }
    </div>
  )
}

const Colum=({title,tag,cards,color,setActiveCard,onDrop})=>{
  const ti = title
  //console.log(ti);

    return (
    <div classname='bg-neutral-800 p-5 ' style={{ width:"350px"}}>
        <h1 className={`pl-4 text-${color}-200`}>{tag}</h1>
      <DropArea onDrop={()=>onDrop(title)}/>
        {cards.map((it)=>  {if(it[7]===ti) { 
           return <>
           <Card  name={it[0]} deg={it[1]} title={it[2]}
            desc={it[3]} day={it[4]} time={it[5]} status={it[7]} task_id={it[8]}
            setActiveCard={setActiveCard} />
            <DropArea onDrop={()=>onDrop(title)}/>
           </>
         }  }  )}
        
        <DropArea onDrop={()=>onDrop(title)}/>
    </div>
    )
}

const Card=(props)=>{

  const [show, setShow] = useState(false)

  const Modal=(props)=>{
    return (
      <div className='modal-wrapper'>
        <div className='modal-container'>
          <p> 
            <span style={{color:"yellow" , fontSize:"28px"}}>{props.props.title} </span>
            <br/> 
            <span style={{fontSize:"14px"}}>Status: {props.props.status === "not_started" ? "Not Started" : props.props.status === "inProgress" ? "In Progress" : props.props.status === "completed" ? "Completed" : "" }</span>
            <br/>
            <span style={{fontSize:"16px"}}>Assigned to <span style={{fontSize:"22px"}}>{props.props.name}</span></span>
            <br/>
            <span style={{fontSize:"24px", color:"yellow"}}>Description</span>
            <br/>
            <span style={{fontSize:"18px"}}>{props.props.desc}</span>
            <br/>
            <span><span style={{fontSize:"18px"}}>Estimated Time: </span> {props.props.time} Hours</span>
          </p>
          <button className="close-button hover:cursor-pointer" onClick={()=>setShow(!show)}>X</button>
          {/* <p>1. Employee Name:  {props.props.name}</p>
          <p>2. Designation:  {props.props.deg}</p>
          <p>3. Task:  {props.props.title}</p>
          <p>4. Task Description:  {props.props.desc}</p>
          <p>5. Date:  {props.props.day}</p>
          <p>6. Estimated_time:  {props.props.time}</p>
          <p>7. status:  {props.props.status}</p> */}
      </div>
      </div>
    )
  }

  
    return ( 
    
<>
    <div draggable onDragStart={()=>props.setActiveCard(props.task_id)} onDragEnd={()=>props.setActiveCard(null)} 
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

const ColumDel = ({title,tag,cards,color,setActiveCard,onDrop})=>{
  const [showDrop, setshowDrop] = useState(false)
  return (
    <div classname='bg-neutral-800 p-5 ' style={{ width:"350px"}}>
      <h1 className={`pl-4 text-${color}-200`}>{tag}</h1>
      
      <FaTrash   
      onDragEnter={()=> setshowDrop(true)} onDragLeave={()=> setshowDrop(false)}
      onDrop={()=>{onDrop();setshowDrop(false)}}
      onDragOver={(e)=>e.preventDefault()}
      className={showDrop ? 'remove-card-dashed' : 'remove-card'}
      />
      
      </div>
  )
}