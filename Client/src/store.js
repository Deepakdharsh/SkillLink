import { configureStore } from "@reduxjs/toolkit";
import UsersliceReducer from "../src/features/userSlice"

const store=configureStore({
    reducer:UsersliceReducer
})

export default store;