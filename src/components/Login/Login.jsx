import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../../Firebase.init";
import { Link } from "react-router-dom";

const Login = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState(false);

    const emailRef = useRef();

    const handleLogin = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        // reset state
        setErrorMsg('')
        setSuccessMsg(false)

        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            console.log(result.user)
            if(!result.user.emailVerified){
                alert(`First verify your email. Check ${result.user.email}`)
            }
            else{
                 setSuccessMsg(true)
            }
            
        })
        .catch(error =>{
            // console.log(error.message)
            setErrorMsg(error.message)
        })
    }

    const handleForgetPassword = () =>{
        console.log(emailRef.current.value);
        const email = emailRef.current.value;
        
        setErrorMsg('')

        sendPasswordResetEmail(auth, email)
        .then(() =>{
            alert(`Check your email: ${email} to reset password`)
        })
        .catch(error =>{
            setErrorMsg(error.message)
        })
        
    }

  return (
    <div className=" w-3/4 mx-auto">
      <div className="hero bg-base-200 min-h-screen w-3/4 mx-auto">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleLogin} className="fieldset">
                <label className="label">Email</label>
                <input type="email" name="email" ref={emailRef} className="input" placeholder="Email" />
                <label className="label">Password</label>
                <input
                
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                />
                <div onClick={handleForgetPassword}>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Login</button>
                <p>Are you new User? <Link to='/signup' className="text-blue-400 underline">Sign up here!</Link></p>

                {
                   errorMsg && (<p className="text-red-500 text-lg font-bold">{errorMsg}</p>
                )}
                {
                    successMsg && (<p className="text-green-400 text-lg font-bold">Log in Successfully!</p>)
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
