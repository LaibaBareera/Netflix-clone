import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Login.css'
import Navbar from './Navbar';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
const validate= (values)=>{
  const errors = {};
  if(!values.email){
    errors.email = 'Required';
  }
  else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
    errors.email= "Invalid email";
  }
  if(!values.password){
    errors.password = 'Required';
  }
  return errors;
}
function Login(props) {
     const navigate = useNavigate();
 const formik= useFormik({
  initialValues:{
    email:'',
    password: ''
  },
  validate,
  onSubmit: (values) => {
    navigate('/trailer');
  }
 }) 
    return (
    <>
    <Navbar/>
    <div className='main'>         
          <div className='Container'>
            <form className='form' onSubmit={formik.handleSubmit}>
            <h1 className='title'>Sign in</h1>
            <label htmlFor='email' className='lab'>
                Email
            </label>
                <input type='text' name='email' placeholder='Enter Email' className='inp' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.email && formik.errors.email ? (
            <div style={{color: 'red'}} className='error' >{formik.errors.email}</div>
          ) : null}
                <label htmlFor='password' className='lab'>
                Password
            </label>
                <input type='text' name='password' placeholder='Enter Password' className='inp' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.password && formik.errors.password ? (
            <div style={{color: 'red'}} className='error' >{formik.errors.password}</div>
          ) : null}
                <button className='login-btn'>Login</button>
                <hr className="line" />
                <Link to={'/signup'} className='link'>New to Netflix? <span style={{color:'white', paddingLeft:'1vh'}}> SignUp</span></Link>

            </form>
          </div>  
          </div>
          </>
    );
}

export default Login;