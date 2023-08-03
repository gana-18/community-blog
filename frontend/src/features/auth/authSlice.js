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

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => { // Use builder to define extraReducers
      builder
          .addCase(login.pending, (state) => {
              state.status = "loading";
          })
          .addCase(login.fulfilled, (state, action) => {
              state.status = "succeeded";
              state.user = action.payload;
          })
          .addCase(login.rejected, (state, action) => {
              state.status = "failed";
              state.error = action.error.message;
          })
  },
});
export const {setUser} = authSlice.actions;
export default authSlice.reducer;


 




