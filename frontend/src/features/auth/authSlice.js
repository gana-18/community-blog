import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"

const initialState = {
    user: [],
    status: "idle",
    error: null,
    };

    export const login = createAsyncThunk('auth/login', async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/auth/login/success`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });
    
        if (response.status === 200) {
          const resObject = await response.json();
          console.log("Response from login:", resObject);
          return resObject.user;
        } else {
          throw new Error("Authentication has failed!");
        }
      } catch (err) {
        console.error("Error in login:", err);
        throw err;
      }
    });
    

    export const logout = createAsyncThunk('auth/logout', async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/auth/logout`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });
    
        if (response.status === 200) {
          const resObject = await response.json();
          console.log("Response from logout:", resObject);
          return resObject.user;
        } else {
          throw new Error("Authentication has failed!");
        }
      } catch (err) {
        console.error("Error in logout:", err);
        throw err;
      }
    });
    

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


 




