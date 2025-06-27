import React, { useRef, useState, useEffect } from 'react';
import '../css/home.css'
import '../css/login.css'
export default function Login(){
    return(
        <>
            <div className="login">
        <div className="logo">
            <i className='bx bx-user-circle'></i>
            <h2>Sign in</h2>
        </div>

        <form action="#">
            <div className="input_box">
                <span>Email</span>
                <div className="icon">
                    <i className='bx bxs-user'></i>
                    <input type="email" className="box" placeholder="Enter Email" required/>
                </div>
            </div>
            
            <div className="input_box">
                <span>Password</span>
                <div className="icon">
                    <i className='bx bxs-lock-alt'></i>
                    <input type="password" placeholder="Enter Password" required/>
                </div>
            </div>

            <div className="forgot_password">
                <a href="#">Forgot Password?</a>
            </div>

            <button type="submit">Login</button>

            <p className="signup">Or Sign Up Using</p>

            <div className="social_icon">
                <a href="resturant.html" id="facebook"><i className='bx bxl-facebook'></i></a>
                <a href="#" id="twitter"><i className='bx bxl-twitter'></i></a>
                <a href="resturant.html" id="google"><i className='bx bxl-google'></i></a>
                <a href="#" id="github"><i className='bx bxl-github'></i></a>
            </div>

            <div className="alreadyAccount">
                <p>Already have an account? <a href="Sign in.html">Log in</a></p>
            </div>
            
                <a href="Sign in.html">Back</a>
                            
        </form>
    </div>
        </>
    )
}