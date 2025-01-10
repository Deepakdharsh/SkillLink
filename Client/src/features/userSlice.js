import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userDetails:null,
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.userDetails=action.payload
        }
    }
})

export const {setUser}=userSlice.actions

export default userSlice.reducer