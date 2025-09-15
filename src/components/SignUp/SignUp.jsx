import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../Firebase.init";

const SignUp = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState(false)

    
  
  const handleSignup = e =>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password)

    setErrorMessage('')
    setSuccessMessage(false)


    // VALIDATE PASSWORD FIRST BEFORE GOING INSIDE FIREBASE
    
    const passwordRegularExpression = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    if(passwordRegularExpression.test(password)===false){
       
        setErrorMessage('Password must be lowercase, uppercase, number, & 8 characters long')
        return;
    }


    createUserWithEmailAndPassword(auth, email, password)
    .then(result =>{
        console.log(result);
        setSuccessMessage(true)
        
    })
    .catch(error =>{
        console.log(error);
        setErrorMessage(error.message)
    })
  }

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse w-3/4 gap-10 mx-auto">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form className="fieldset" onSubmit={handleSignup}>
                <label className="label" >Email</label>
                <input type="email" name="email" className="input" placeholder="Email" />
                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>

                </div>
                {
                    errorMessage && <p className="text-red-500">{errorMessage}</p>
                }
                {
                    successMessage && <p className="text-green-400">Yea! Successfully Sign up!</p>
                }
                <button className="btn btn-neutral mt-4">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
