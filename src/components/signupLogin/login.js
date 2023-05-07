import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import title from "./title1.png"
import CircularProgress from '@mui/joy/CircularProgress';
import { Box } from '@mui/material';


const Login = () => {
    const navigate = useNavigate()
    const [load,setLoad] = useState(false)

    const formValidation = yup.object({
        mail : yup
        .string()
        .required("Why not fill this field ?"),
        password : yup
        .string()
        .required("Why not fill this field ?")
    });

    const {handleSubmit, values ,handleChange, handleBlur, errors, touched} =
    useFormik({
        initialValues : {mail:"",password:"",output:""},
        validationSchema : formValidation,
        onSubmit : (loginData)=>{
            login(loginData)
        }
    })
    const login = (loginData)=>{
        // console.log(loginData)
        setLoad(true)
        fetch("https://bikewashapp.onrender.com/login",
        {
          method : "POST",
          crossDomain : true,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin' : "*",
          },
          body: JSON.stringify({
            mail : loginData.mail,
            password : loginData.password
          }),
        })
        .then((ans)=>ans.json())
        .then((data)=>{
            // console.log(data)
            setLoad(false)
            if(data.status==="401"){
                // alert(data.msg)
                NotificationManager.error(data.msg,"Error",4000)
                return
            }
            else if(data.status==="200"){
                NotificationManager.success(data.msg,"Success",4000)
                localStorage.setItem("token",data.token);
                if(data.userType ==="admin"){
                    navigate('/admin')
                }else{
                    navigate('/user')
                }
            }
        })
        .catch((error)=>{
            console.log(error)
            NotificationManager.error(error,"Error",4000)
        })
    }
  return (
    <form onSubmit={handleSubmit} className='login-container'>
        <div className='app-tittle'>
            <img src={title} className='tit-img' aria-label='bikewash image'/>
        </div>
        <div className='login-inputs'>
            <div className='login'>
                Login
            </div>
            <div className='input-div'>
                <label className='input-label'>Mail : </label><br/>
                <input
                className='input-box'
                type="text"
                name="mail"
                value={values.mail}
                placeholder='Enter your email'
                onChange={handleChange}
                onBlur={handleBlur}
                /><br/>
                {touched.mail && errors.mail ?<span className='error'>{touched.mail && errors.mail}</span>:"" }
            </div>
            <div className='input-div'>
                <label className='input-label'>Password : </label><br/>
                <input
                className='input-box'
                type="password"
                name="password"
                placeholder='Enter your password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                /><br/>
                {touched.password && errors.password?<span className='error'>{touched.password && errors.password}</span>:""}
            </div>
            <div className='footer'>
                <button className='login-btn' type="submit"> {load?
                <Box sx={{
                    display:"flex",
                    justifyContent:"center",
                    gap:"10px"
                  }}>Logins
                    <CircularProgress className="process" color='info' size='sm' variant="soft"/>
                </Box>:"Login"}
                </button>
                <div><Link className='already' to="/signup">Don't have an account? Signup</Link></div>
            </div>
       </div>
    </form>
  )
}

export default Login