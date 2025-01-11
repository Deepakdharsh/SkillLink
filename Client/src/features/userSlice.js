import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userDetails:null,
    token:"",
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
        }
    }
})

export const {setUser,setToken}=userSlice.actions

export default userSlice.reducer