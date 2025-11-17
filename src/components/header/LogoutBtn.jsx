import React from 'react'
import {useDispatch}from "react-redux"
import authService from "../../appwrite/auth"
import {logout} from "../../store/authSlice"



function LogoutBtn() {
    const dispatch=useDispatch()
    const logoutHandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }

  return (
    <button onClick={logoutHandler} className='inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 text-blue-200 hover:bg-blue-500/40 transition text-sm font-medium'>Logout</button>
  )
}

export default LogoutBtn