import authService from "../appwrite/auth"
import {Link, useNavigate} from "react-router-dom"
import React, {useState} from 'react'
import Button from "./Button"
import Input from './Input'
import Logo from "./Logo"
import {useForm} from "react-hook-form"
import {useDispatch} from "react-redux"
import {login as authLogin} from "../store/authSlice"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()

                console.log("in login userData", userData);
                if (userData) dispatch(authLogin({userData}))
                    navigate("/")
                console.log("in login userData", userData);
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center w-full">
            <div className="mx-auto w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900/50 p-10 shadow-2xl backdrop-blur">
                <div className="mb-6 text-center">
                    <Logo size="text-4xl" />
                    <p className="mt-2 text-sm text-slate-400">Welcome back to Blogifi</p>
                </div>

                <p className="mt-2 text-center text-sm text-slate-400">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-semibold text-blue-300 hover:text-blue-200"
                    >
                        Join
                    </Link>
                </p>
                {error && <p className="text-red-400 mt-6 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
                        <Input
                            label="Email"
                            placeholder="you@email.com"
                            type="email"
                            {...register("email", {
                                required: true,
                                
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            {...register("password", { required: true })}
                        />
                        <Button type="submit" className="w-full justify-center">
                            Sign in
                        </Button>
                </form>
            </div>
        </div>
    );
}

export default Login