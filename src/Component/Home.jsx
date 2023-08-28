import React from 'react';
import '../CSS/Home.css'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
const validate= (values)=>{
  const errors = {};
  if(!values.email){
    errors.email = 'Required';
  }
  else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
    errors.email= "Invalid email";
  }
  return errors;
}


function Home(props) {
    const navigate = useNavigate();
 const formik= useFormik({
  initialValues:{
    email:''
  },
  validate,
  onSubmit: (values) => {
    navigate('/signup');
  }
 }) 
    return (
        <>
        <Navbar/>
        <div className='mains'>
 
            <div className='home'>
                <h1 className='homehead'>Unlimited movies, TV shows and more</h1>
                <h2>
                    Watch anywhere. Cancel anytime.
                </h2>
                <h2>
                    Ready to watch? Enter your email to create or restart your membership.
                </h2>
                <div>
                <form onSubmit={formik.handleSubmit}>

              
                <input type='text' name='email' className='home-email' placeholder='Email address' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.email && formik.errors.email ? (
            <span style={{color: 'red'}} className='erro' >{formik.errors.email}</span>
          ) : null}
                <button type='submit' className='home-btn'>Get started</button>
                </form>
                </div>
                </div>

</div>

            
            
</>
        
    );
}

export default Home;