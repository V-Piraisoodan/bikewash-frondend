import React from 'react'
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";
import YupPassword from 'yup-password';
import png from './bikewash.png';
import title from "./title1.png"
import { NotificationContainer, NotificationManager } from 'react-notifications';
YupPassword(yup);

const Signup = () => {

    const navigate = useNavigate()

    const formValidation = yup.object({
       mail :yup
       .string()
       .matches(
          /^[A-Z0-9._%+-]+@[A-Z0-9*-]+\.[A-Z]{2,}$/i,
          "Pattern not matched")
      .required ("Why not fill this email ?"),
       password : yup
       .string()
       .min(8,"Password is too short - should be 8 char minimum.")
       .required("Why not fill this password ?")
       .minLowercase(1, 'password must contain at least 1 lower case letter')
       .minUppercase(1, 'password must contain at least 1 upper case letter')
       .minNumbers(1, 'password must contain at least 1 number')
       .minSymbols(1, 'password must contain at least 1 special character'),
       name : yup
       .string()
       .required("Why not fill this name ?"),
       phone : yup
       .string()
       .required("Why not fill this number ?")
       .matches( /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,"Phone number is not valid.")
       .min(10,"Enter a 10digit mobile number"),
       usertype : yup
       .string()
       .required("Why not fill this usertype ?"),
    });

    const {handleSubmit, values ,handleChange, handleBlur, errors, touched} =
    useFormik({
        initialValues : {name:"",phone:"",mail:"",password:"",usertype:"",secretkey:""},
        validationSchema : formValidation,
        onSubmit : (signupData)=>{
            signup(signupData,values)
        }
    })
    const signup = (signupData,values)=>{
        if(values.usertype === "admin" && values.secretkey===""){
            NotificationManager.warning("Please enter the secret key","Warning",5000)
            return
        }
        // console.log(values)
        fetch("https://bikewashapp.onrender.com/signup",
        {
          method : "POST",
          crossDomain : true,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin' : "*",
          },
          body: JSON.stringify({
            name : signupData.name,
            mail : signupData.mail,
            phone : signupData.phone,
            password : signupData.password,
            usertype : signupData.usertype,
            secretkey : signupData.secretkey,
          }),
        })
        .then((ans)=>ans.json())
        .then((data)=>{
            // console.log(data)
            if(data.status==="401"){
                // alert(data.msg)
                NotificationManager.error(data.msg,"Error",4000)
                return
            }
            else if(data.status==="200"){
                NotificationManager.success(data.msg,"Success",4000)
                navigate('/') 
            }
            else if(data.msg==="Invalid Admin"){
                NotificationManager.error(data.msg,"Error !! Please enter the correct Secret key",4000)
            }
        })
        .catch((error)=>{
            console.log(error)
            alert(error)
        })
    }


return (
<form onSubmit={handleSubmit} className='signup'>
    <div className='app-tittle'>
        <img src={title} className='tit-img' aria-label='bikewash image'/>
    </div>

    <div className='signup-container'>
        <div className='signup-image'>
          <img className='pngimg' src={png} aria-label='bikewash image'/>
        </div>

        <div className='signup-data'>
            <div className='signup-data-name'>Create a new account</div>
            
            <div className='signup-inputs'>
               <div className='input-div'>
                    <label className='input-label'>Name : </label><br/>
                    <input
                        className='input-box'
                        type="text"
                        name="name"
                        value={values.name}
                        placeholder='Enter your name here'
                        onChange={handleChange}
                        onBlur={handleBlur}
                    /><br/>
                    {touched.name && errors.name ?<span className='error'>{touched.name && errors.name}</span>:"" }
                </div>

                <div className='input-div'>
                    <label className='input-label'>Mail : </label><br/>
                    <input
                        className='input-box'
                        type="text"
                        name="mail"
                        placeholder='Enter your email here'
                        value={values.mail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    /><br/>
                    {touched.mail && errors.mail ?<span className='error'>{touched.mail && errors.mail}</span>:"" }
                </div>

                <div className='input-div'>
                    <label className='input-label'>Phone : </label><br/>
                    <input
                        className='input-box'
                        type="text"
                        name="phone"
                        placeholder='Enter your number here'
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    /><br/>
                    {touched.phone && errors.phone?<span className='error'>{touched.phone && errors.phone}</span>:""}
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

                <div className='input-div'>
                    <label className='input-label'>User type : </label><br/>
                    <select
                        className='select-box'
                        name="usertype"
                        value={values.usertype}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <option className='value' value="" label="Select a User type" />
                        <option className='value' value="user" label="User" />
                        <option className='value' value="admin" label="Admin" />
                    </select><br/>
                    {touched.usertype && errors.usertype?<span className='error'>{touched.usertype && errors.usertype}</span>:""}
                </div>

                {values.usertype==="admin"?
                <div className='input-div'>
                    <label className='input-label'>Secret key : </label><br/>
                    <input
                        className='input-box'
                        type="text"
                        name="secretkey"
                        value={values.secretkey}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    /><br/>
                    {touched.secretkey && errors.secretkey?<span className='error'>{touched.secretkey && errors.secretkey}</span>:""}
                </div>:""}

                <div className='footer'>
                    <button className='btn' type="submit">Signup</button>
                    <div><Link to="/" className='already'>Already have an account?  Login</Link></div>
                </div>
            </div>
        </div>
    </div>
   <NotificationContainer/>
</form>
  )
}

export default Signup