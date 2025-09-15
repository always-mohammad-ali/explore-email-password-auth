import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../Firebase.init";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    console.log(email, password);

    setErrorMessage("");
    setSuccessMessage(false);

    // VALIDATE PASSWORD FIRST BEFORE GOING INSIDE FIREBASE

    const passwordRegularExpression = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    if (passwordRegularExpression.test(password) === false) {
      setErrorMessage(
        "Password must be lowercase, uppercase, number, & 8 characters long"
      );
      return;
    }
    
    if(!terms){
        setErrorMessage('Accept terms & conditions politely!')
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        setSuccessMessage(true);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };

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
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="input"
                    placeholder="Password"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-xs absolute right-6 top-2"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>

                <label className="label">
                  <input type="checkbox" name="terms" className="checkbox" />
                  Accept terms and conditions.
                  
                </label>

                <button className="btn btn-neutral mt-4">Sign Up</button>

                {errorMessage && (
                  <p className="text-red-500 font-bold text-lg my-3">
                    {errorMessage}
                  </p>
                )}
                {successMessage && (
                  <p className="text-green-400 font-bold text-lg my-3">
                    Yea! Successfully Sign up!
                  </p>
                )}


                <p>Already Have An Account? <Link className="underline text-blue-500" to='/login'>Please Login</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
