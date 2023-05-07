import React, { useEffect, useState } from 'react'
import { NotificationManager } from 'react-notifications';
import {useNavigate} from "react-router-dom";
import Skeletonloading from '../Skeleton/skeleton';

const Home = () => {
    const [bike,setBike] = useState([])
    const [load,setLoad] = useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
        getAlldata(); 
      },[]);
    function getAlldata(){
      setLoad(true)
      fetch("https://bikewashapp.onrender.com/user",
      {
        method: "GET",
        headers: {
          "x-auth-token" : localStorage.getItem("token")
        },
      })    
      .then(data=>data.json())    
      .then(ans=>{
        // console.log(ans)
        setLoad(false)
        function cb(){
          navigate("/")
          return
        }
        function hoc(val){
          if(ans.msg==="not authorized"){
            NotificationManager.error(ans.error,"Please login and try again later",5000)
            val()
          }else{
            setBike(ans)
          }}  
          hoc(cb)
        }) 
      .catch((e)=>console.log(e))  
    }
      // console.log(bike)
    function handleUpdate(e,id,name){
      // console.log(e,id,name)
      // console.log(e.target.value)
      let status = "Delivered"
      if(window.confirm(`Are you sure you want to get your bike ${name}`)){
        fetch("https://bikewashapp.onrender.com/updateStatus",
        {
          method : "PUT",
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            token : localStorage.getItem("token"),
            id : id,
            status : status
          }),
        })
        .then((ans)=>ans.json())
        .then((data)=>{
          // alert(data.msg)
          getAlldata();
        })
      }
      // else{
      //   preventDefault()
      // }
    
    }
return (
 <>
 {load? <Skeletonloading/> :
  <div className='user-container'>
  {bike.map((val,index)=>{
    return(
      <div key={index} className='bike-container'>
        <div className='tokennum'>Token no : {index+1}</div>
        <div>Bike Company : {val.bikename}</div>
        <div className='regnum'>Reg.Num : {val.bikenumber}</div>
        <div>
          {val.status==="" ? <div>Status : <span className='pending'>⏳ Pending</span></div>:
          val.status==="Washing" ?<div>Status : <span className='washing'>💦 {val.status}</span></div>:
          val.status==="Completed" ?<div>Status : <span className='completed'>👍 {val.status}</span></div>:
          <div>Status : <span className='delivered'>✔ {val.status}</span></div>}
        </div>
        <div className='com-getbike'>{val.status==="Completed" ? <button className='getbike' onClick={(e)=>handleUpdate(e,val._id,val.bikename)}>Get Bike</button>: val.status ==="Delivered" ? <button disabled={true} className='dis'>Delivered</button>:<button disabled={true} className='dis'>Processing</button>}</div>
      </div>
      
    )
  })}  
</div>}
 </>
  )
}

export default Home