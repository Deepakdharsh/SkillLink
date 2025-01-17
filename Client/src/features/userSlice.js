import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userDetails:null,
    token:"",
    forgotEmail:"",
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.userDetails=action.payload
        },
        setToken:(state,action)=>{
            console.log(action.payload)
            state.token=action.payload
        },
        setForgotEmail:(state,action)=>{
            console.log(action.payload)
            state.forgotEmail=action.payload
        }
    }
})

export const {setUser,setToken,setForgotEmail}=userSlice.actions

export default userSlice.reducer