import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    // const {user}=useSelector(state=>state.userReducer)
    const user=false
    const navigate=useNavigate()
    useEffect(()=>{
        if(!user) navigate("/home/sign-in")
    },[user,navigate])
    console.log(user)
  return user ? children : null
}

export default ProtectedRoute

// export default UserProtectedRoute
