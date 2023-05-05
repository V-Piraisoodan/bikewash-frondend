import React from 'react'
import { useFormik } from 'formik';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import title from "./bg1.png";
import "./addbike.css"
import { NotificationManager} from 'react-notifications';


const Addbike = () => {
    const navigate = useNavigate()

    const formValidation = yup.object({
        bikename : yup
        .string()
        .required("Why not fill this field ?"),
        bikenumber : yup
        .string()
        .required("Why not fill this field ?")
    });

    const {handleSubmit, values ,handleChange, handleBlur, errors, touched} =
    useFormik({
        initialValues : {bikename:"",bikenumber:"",output:""},
        validationSchema : formValidation,
        onSubmit : (bikeData)=>{
            addBike(bikeData)
        }
    })
    const addBike = (bikeData)=>{
        // console.log(loginData)
        fetch("http://localhost:9000/bikedata",
        {
          method : "POST",
          crossDomain : true,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin' : "*",
            "x-auth-token" : localStorage.getItem("token")
          },
          body: JSON.stringify({
            bikename : bikeData.bikename,
            bikenumber : bikeData.bikenumber,
            status : ""
          }),
        })
        .then((ans)=>ans.json())
        .then((data)=>{
            function cb(){
                localStorage.removeItem("token")
                navigate("/")
                return
              }
              function hoc(val){
                if(data.msg==="not authorized"){
                  NotificationManager.error(data.error,"Please login and try again later",5000)
                  val()
                }
                else{
                    function nav(){
                        navigate('/user')
                    }
                    function timeout(val){
                        // alert("Data added successfully")
                        NotificationManager.success("Data added successfully","success",4000)
                        val();
                    }
                    timeout(nav)
                }
            }  
                hoc(cb)
            // console.log(data)
        })
        .catch((error)=>{
            console.log(error)
            alert(error)
        })
    }
    function logout(){
        localStorage.removeItem("token")
        NotificationManager.warning("Successfully","Logout",5000);
        navigate('/')
      }

return (
<div className='addbike-container'>
    <div className='admin-bar'>
        <img src={title} className='admin-img' aria-label='bikewash image'/>
        <div className='admin-nav'>
            <div className='home' onClick={()=>navigate('/user')}>Home</div>
            <div className='addbike' onClick={()=>navigate('/addbike')}>Add bike</div>
            <div className='logout' onClick={logout}>Logout</div>
        </div>
    </div>
        {/* <NotificationContainer/> */}
    <div className='addbike-inputs'>
    <form onSubmit={handleSubmit} className='addbike-form'>
        <div className='input-div'>
            <label className='input-label'>Bike name and model : </label><br/>
            <input
            className='input-box'
            type="text"
            name="bikename"
            value={values.bikename}
            placeholder='Eg. Honda x-blade'
            onChange={handleChange}
            onBlur={handleBlur}
            /><br/>
            {touched.bikename && errors.bikename ?<span className='error'>{touched.bikename && errors.bikename}</span>:"" }
        </div>
        <div className='input-div'>
            <label className='input-label'>Registration Number : </label><br/>
            <input
            className='input-box'
            type="text"
            name="bikenumber"
            value={values.bikenumber}
            placeholder='Eg. TN-01 1234'
            onChange={handleChange}
            onBlur={handleBlur}
            /><br/>
            {touched.bikenumber && errors.bikenumber ?<span className='error'>{touched.bikenumber && errors.bikenumber}</span>:"" }
        </div>
        <div className='footer'>
            <button className='login-btn' type="submit">Submit</button>
        </div>
       {/* <NotificationContainer/> */}
    </form>
    </div>
</div>
  )
}

export default Addbike