import { getuser } from '@/api/apiService'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function ProtectedRoute({children}) {
  const [isblocked, setIsblocked] = useState(false)
    //  const data=useSelector((state)=>state.token)
     const data=localStorage.getItem("jwtToken")
    //  console.log(data)
    // const user=false
    const navigate=useNavigate()
    async function fetchData(){
     const res = await  getuser()
     console.log("difhaidf")
     console.log(res.result.user.isBlocked)
     console.log("dhafadfa")
     setIsblocked(res.result.user.isBlocked)
    }
    useEffect(()=>{
        fetchData()
        console.log("=========")
        console.log(isblocked)
        console.log("=========")
        // if(!data||isBlocked) {
        if(isblocked){
          if(!data||isblocked) {
            localStorage.removeItem("jwtToken");
            navigate("/home/sign-in")
            toast("something went wrong.",{
              position: "top-center",
              autoClose: 3000,
            })
          }
        }else{
          if(!data) {
            // localStorage.removeItem("jwtToken");
            navigate("/home/sign-in")
          }
        }
    },[data,navigate,isblocked])
    // console.log(data)
  return data ? children : null
}

export default ProtectedRoute

// export default UserProtectedRoute
