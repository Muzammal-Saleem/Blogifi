import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login as authLogin } from '../store/authSlice'
import authService from '../appwrite/auth'
import Logo from './Logo'
import Input from './Input'
import Button from './Button' 
function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error, setError]=useState("");


    const create= async(data)=>{
        setError("");
       try {
         const  userData  = await authService.createAccount(data);
         console.log("userData", userData);
        if (userData){
          const userData = await authService.getCurrentUser()
          console.log
           dispatch(authLogin({userData}));
            navigate("/");  
        }
        
       } catch (error) {
        console.log("i am error",error);
        setError(error.message);
       }
    }



  return (
     <div className="flex items-center justify-center">
            <div className="mx-auto w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900/50 p-10 shadow-2xl backdrop-blur">
                <div className="mb-6 text-center">
                    <Logo size="text-4xl" />
                    <p className="mt-2 text-sm text-slate-400">Create your Blogifi profile</p>
                </div>
                <p className="mt-2 text-center text-sm text-slate-400">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-semibold text-blue-300 hover:text-blue-200"
                    >
                        Sign in
                    </Link>
                </p>
                {error && <p className="text-red-400 mt-6 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)} className="mt-8 space-y-5">
                        <Input
                            {...register("name", { required: true })}
                            label="Full Name"
                            placeholder="Jane Doe"
                        />
                        <Input
                            {...register("email", {
                                required: true,
                                
                            })}
                            label="Email"
                            placeholder="you@email.com"
                            type="email"
                        />
                        <Input
                            {...register("password", { required: true })}
                            label="Password"
                            type="password"
                            placeholder="Create a strong password"
                        />
                        <Button type="submit" className="w-full justify-center">
                            Create Account
                        </Button>
                </form>
            </div>
        </div>
  )
}

export default Signup