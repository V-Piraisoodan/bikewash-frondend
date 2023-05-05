import React, { useEffect, useState } from 'react';
import "./admin.css";
import title from "./bg1.png";
import { NotificationManager } from 'react-notifications';
import {useNavigate} from "react-router-dom";


const Admin = () => {

  const [bike,setBike] = useState([])
  const navigate = useNavigate();

    
    useEffect(()=>{
        getAlldata();  
      },[]);
    function getAlldata(){
      fetch("http://localhost:9000/admin",
        {
          method: "GET",
          headers: {
            "x-auth-token" : localStorage.getItem("token")
          },
        })  
        .then(data=>data.json())       
        .then(ans=> {
          // console.log(ans)
          function cb(){
            NotificationManager.error(ans.error,"Not Authorized",5000)
            return
          }
          function hoc(val){
            if(ans.msg==="not authorized"){
              navigate("/")
              val()
            }else{
              setBike(ans)
            }
          }  
          hoc(cb)
          }) 
        .catch((err)=>console.log(err))
    }

    function handleDelete(id,name){
      // console.log(id,name)
      if(window.confirm(`Are you sure you want to delete ${name}`)){
        fetch("http://localhost:9000/deleteUser",
        {
          method : "POST",
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            id : id,
          }),
        })
        .then((ans)=>ans.json())
        .then((data)=>{
          alert(data.msg)
          getAlldata();
        })
      }
    
    }

    function handleUpdate(e,id,name){
      // console.log(id,name)
      // console.log(e.target.value)
      let status = e.target.value
      if(window.confirm(`Are you sure you want to update the status of ${name} to ${e.target.value}`)){
        fetch("http://localhost:9000/updateStatus",
        {
          method : "PUT",
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
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
      else{
        e.preventDefault()
      }
    
    }

    // function rowSelect(data){
    //   console.log(data)
    // }

    function logout(){
      localStorage.removeItem("token")
      NotificationManager.warning("Successfully","Logout",5000);
      navigate('/')
    }
    
  return (
    <div className='admin-container'>
      
      <div className='admin-bar'>
        <img src={title} className='admin-img' aria-label='bikewash image'/>
        <div className='admin-nav'>
          <div className='admin-dash'>Admin dashboard</div>
          <div className='logout' onClick={logout}>Logout</div>
        </div>
      </div>
          <table className="table">
            <thead className="tablehead">
                <tr className="tablerow" >
                    <td className="th">Id</td>
                    <td className="th">Bike Name</td>
                    <td className="th">Reg.number</td>
                    <td className="th">Status</td>
                    <td className='actions'>Actions</td>
                </tr>
            </thead>
            <tbody className="tablebody">
                {bike.map((data,index)=>{
                    return (
                        <tr key={index} className="tablerow-body">
                          <td className='td'>{index+1}</td>
                          <td className='td'>{data.bikename}</td>
                          <td className='td'>{data.bikenumber}</td>
                          <td className='td'>
                            {data.status===""?<span className='pending'>⏳ Pending</span>:
                            data.status==="Washing"?<span className='washing'>💦 {data.status}</span>:
                            data.status==="Completed"?<span className='completed'>👍 {data.status}</span>:
                            <span className='delivered'>✔ {data.status}</span>}
                          </td> 
                          <td className='td-action'>
                            {data.status === "" ?<select className='select' name="selectedStatus" value={data.status} onChange={(e)=>handleUpdate(e,data._id,data.bikename)}>
                              <option value="Pending">Pending</option>
                              <option value="Washing">Washing</option>
                              <option value="Completed">Completed</option>
                            </select> : data.status === "Washing" ?<select className='select' name="selectedStatus" value={data.status} onChange={(e)=>handleUpdate(e,data._id,data.bikename)}>
                              <option value="Pending" disabled={true}>Pending</option>
                              <option value="Washing">Washing</option>
                              <option value="Completed">Completed</option>
                            </select> : data.status === "Completed" ?<select className='select' name="selectedStatus" value={data.status} onChange={(e)=>handleUpdate(e,data._id,data.bikename)}>
                              <option value="Pending" disabled={true}>Pending</option>
                              <option value="Washing" disabled={true}>Washing</option>
                              <option value="Completed">Completed</option>
                            </select>: <select className='disabled' name="selectedStatus" disabled={true} value={data.status} onChange={(e)=>handleUpdate(e,data._id,data.bikename)}>
                              <option value="Pending">Pending</option>
                              <option value="Washing">Washing</option>
                              <option value="Completed">Completed</option>
                            </select>}
                            <button onClick={()=>handleDelete(data._id,data.bikename)} className='delete'>Delete</button>
                          </td>
                       </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Admin