import React from 'react'
import Home from '../userpage/home';
import { useNavigate } from 'react-router-dom';
import title from "./bg1.png";
import { NotificationManager } from 'react-notifications';

const User = () => {
  let navigate = useNavigate();
  function logout(){
    localStorage.removeItem("token")
    NotificationManager.warning("Successfully","Logout",5000);
    navigate("/")
  }
  return (
    <div>
      <div className='admin-bar'>
        <img src={title} className='admin-img' aria-label='bikewash image'/>
        <div className='admin-nav'>
          <div className='home' onClick={()=>navigate('/user')}>Home</div>
          <div className='addbike' onClick={()=>navigate('/addbike')}>Add bike</div>
          <div className='logout' onClick={logout}>Logout</div>
        </div>
      </div>
      <Home/>
    </div>
  )
}

export default User