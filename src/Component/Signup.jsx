import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Signup.css'
import { useFormik } from 'formik'
import Navbar from './Navbar'
import { Link } from 'react-router-dom';

const validate = (values) => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if(!values.firstname){
    errors.firstname = 'Required';
  }
  else if(values.firstname.length > 20){
    errors.firstname = 'First Name cannot exceed 20 character';
  }
  if(!values.lastname){
    errors.lastname = 'Required';
  }
  else if(values.lastname.length > 20){
    errors.lastname = 'Last Name cannot exceed 20 character';
  }
  if(values.password.length < 8){
    errors.password = 'Password must have atleast 8 characters';
  }
  else if(!/(?=.*?[A-Z])/.test(values.password)){
    errors.password = "Password must have at least 1 upper character";
  }
  else if(!/(?=.*?[a-z])/.test(values.password)){
    errors.password = "Password must have at least 1 lower character";
  }
  else if(!/(?=.*?[0-9])/.test(values.password)){
    errors.password = "Password must have at least 1 digit";
  }
  else if(!/(?=.*?[#?!@$%^&*-])/.test(values.password)){
    errors.password = "Password must have at least 1 Special character";
  }
  if(!values.confirm){
    errors.confirm = "Required";
  }
  else if(values.password  !== values.confirm){
    errors.confirm = "Password and confirm password must be same";
  }

  return errors
}
function Signup(props) {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          email: '',
          firstname: "",
          lastname : '',
          password: "",
          confirm: ""
        },
        validate,
        onSubmit: (values) => {
        //   alert(JSON.stringify(values, null, 2))
        navigate('/');
        },
      })
    return (
      <> 

      <Navbar/>
        <div className='main'>
          <div className='signup-Container'>
            <form className='signup-form' onSubmit={formik.handleSubmit}>
            <h1 className='signup-title'>Sign up</h1>
            <div className='na'>
            <div className='inner'>
            <label htmlFor='firstname' className='signup-lab'>
                First Name
            </label>
                <input type='text' name='firstname' placeholder='Enter First name' className='signup-in' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.firstname && formik.errors.firstname ? (
            <div style={{color: 'red'}} className='error'>{formik.errors.firstname}</div>
          ) : null}
                </div>
                <div className='inner'>
                <label htmlFor='lastname' className='signup-lab'>
                Last Name
            </label>
                <input type='text' name='lastname' placeholder='Enter Last Name' className='signup-in' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.lastname && formik.errors.lastname ? (
            <div style={{color: 'red'}} className='error'>{formik.errors.lastname}</div>
          ) : null}
                </div>
                </div>
            <label htmlFor='email' className='signup-lab'>
                Email
            </label>
                <input type='text' name='email' placeholder='Enter Email' className='signup-inp' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.email && formik.errors.email ? (
            <div style={{color: 'red'}} className='error'>{formik.errors.email}</div>
          ) : null}
                <label htmlFor='password' className='lab'>
                Password
            </label>
                <input type={formik.showPassword ? 'text' : 'password'}  name='password' placeholder='Enter Password' className='signup-inp' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.password && formik.errors.password ? (
            <div style={{color: 'red'}} className='error'>{formik.errors.password}</div>
          ) : null}
                <label htmlFor='password' className='lab'>
               Confirmed Password
            </label>
                <input type={formik.showPassword ? 'text' : 'password'}  name='confirm' placeholder='Enter Password' className='signup-inp' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.confirm && formik.errors.confirm ? (
            <div style={{color: 'red'}} className='error'>{formik.errors.confirm}</div>
          ) : null}
                <button className='signup-btn'>Sign Up</button>

                <hr className="signup-line" />
                <Link to={'/login'} className='link'>Already SignUp? Login</Link>

            </form>
          </div>  
        </div>
        </>
    );
}

export default Signup;