import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../../../config/api";

const initialState = {
  message: null,
  user: null,
  token: '',
  isloading: false,
}

export const login = createAsyncThunk('login', async(data)=>{
  const response = await fetch(API_URL + "api/v1/login", {
    method: 'POST',
    body:JSON.stringify(data),
    headers:{
      "Content-Type":'application/json',
      "Accept":"application/json"
    }
  })
  const resp = await response.json() 
  console.log(resp);
  return resp;
})

export const register = createAsyncThunk('register', async(data)=>{
  const response = await fetch(API_URL + "api/v1/register", {
    method: 'POST',
    body:data,
    headers:{
      "Content-Type": "multipart/form-data",
      
    }
  })
  
  const resp = await response.json() 
  console.log(resp);
  return resp;
})

export const updateUser = createAsyncThunk('updateUser', async(data, id)=>{
  console.log(id)
  console.log(data)
  const response = await fetch(API_URL + "api/v1/user/update/"+id , {
    method: 'PUT',
    body:JSON.stringify(data),
    headers:{
      "Content-Type":'application/json',
      "Accept":"application/json",
      //"Authorization": `Bearer ${token}`
    }
  })
  
  console.log(response)
  const resp = await response.json() 
  console.log(resp);
  return resp;
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{

  },
  extraReducers:{
    [login.pending]: (state, action)=>{
      state.isloading = true
    },
    [login.fulfilled]: (state, {payload: {message, user, token}})=>{
      state.isloading = false
      if(message){
        state.message = message
        console.warn(state.message)
      }else{
        state.user = user
        state.token = token
        console.warn("sucesso!");
      }
    },
    [login.rejected]: (state, action)=>{
      state.isloading = true
    },
     /*----------------------UPDATE----------------------------------*/
    [updateUser.pending]: (state, action)=>{
      state.isloading = true
    },
    [updateUser.fulfilled]: (state, {payload: {message, user}})=>{
      state.isloading = false
      if(message){
        state.message = message
        console.warn(state.message)
      }else{
        state.user = user
        console.warn("sucesso!");
        console.log(state.user.id)
      }
    },
    [updateUser.rejected]: (state, action)=>{
      state.isloading = true
    },

    /*----------------------Register----------------------------------*/
    [register.pending]: (state, action)=>{
      state.isloading = true
    },
    [register.fulfilled]: (state, {payload: {message, user, token}})=>{
      state.isloading = false
      if(message){
        state.message = message
        console.warn(state.message)
      }else{
        state.user = user
        state.token = token
        console.warn("sucesso!");
        console.log(state.token)
        console.log(state.user)
      }
    },
    [register.rejected]: (state, action)=>{
      state.isloading = true
    },
  }
})

export default authSlice.reducer