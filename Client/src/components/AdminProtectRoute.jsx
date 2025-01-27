import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function AdminProtectRoute({children}) {
    //  const data=useSelector((state)=>state.token)
     const data=localStorage.getItem("jwtToken")
    //  console.log(data)
    // const user=false
    const navigate=useNavigate()
    useEffect(()=>{
        if(!data) navigate("/admin/login")
    },[data,navigate])
    // console.log(data)
  return data ? children : null
}

export default AdminProtectRoute