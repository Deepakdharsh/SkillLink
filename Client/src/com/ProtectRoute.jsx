import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

function ProtectedRoute({children}) {
     const data=useSelector((state)=>state.token)
     console.log(data)
    // const user=false
    const navigate=useNavigate()
    useEffect(()=>{
        if(!data) navigate("/home/sign-in")
    },[data,navigate])
    console.log(data)
  return data ? children : null
}

export default ProtectedRoute

// export default UserProtectedRoute
