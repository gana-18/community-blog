import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"

const initialState = {
    user: null,
    status: "idle",
    error: null,
    };

export const login= createAsyncThunk('auth/login',async()=>{
    const response = await fetch(`${process.env.REACT_APP_API}/auth/login/success`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          return resObject.user;
        })
        .catch((err) => {
          console.log(err);
        });
        return response;

})

export const logout= createAsyncThunk('auth/logout',async()=>{
    const response = await fetch(`${process.env.REACT_APP_API}/auth/logout`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          return resObject.user;
        })
        .catch((err) => {
          console.log(err);
        });
        return response;

})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers:{
        [login.pending]:(state,action)=>{
            state.status="loading";
        }
        ,

        [login.fulfilled]:(state,action)=>{
            state.status="succeeded";
            state.user=action.payload;
        }
        ,
        [login.rejected]:(state,action)=>{
            state.status="failed";
            state.error=action.error.message;
        }
        ,
        [logout.pending]:(state,action)=>{
            state.status="loading";
        } 
        ,
        [logout.fulfilled]:(state,action)=>{
            state.status="succeeded";
            state.user=null;
        }
        ,
        [logout.rejected]:(state,action)=>{
            state.status="failed";
            state.error=action.error.message;
        }
    }
});
export const {setUser} = authSlice.actions;
export default authSlice.reducer;


 




