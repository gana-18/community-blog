import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";  
const initialState = {
    posts: [],
    followingPosts:[],
    author:[],
    followers:[],
    following:[],
    likes:[],
    bookmarks:[],
    status: "idle",
    error: null,
    };

export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/home`, {
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
          return resObject;
        } else {
          throw new Error("post rendering has failed!");
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
});

export const fetchFollowingPosts = createAsyncThunk('post/fetchFollowingPosts', async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/following/${id}`, {
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
      console.log("following",resObject);
      return resObject;
    } else {
      throw new Error("post rendering has failed!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
});


export const fetchAuthor = createAsyncThunk('post/fetchAuthor', async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/user/${id}`, {
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
      return resObject;
    } else {
      throw new Error("author rendering has failed!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
});


export const fetchFollowers = createAsyncThunk('post/fetchFollowers', async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/followers/${id}`, {
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
      return resObject;
    } else {
      throw new Error("author rendering has failed!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
});

export const fetchFollowing = createAsyncThunk('post/fetchFollowing', async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/following/${id}`, {
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
      return resObject;
    } else {
      throw new Error("author rendering has failed!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
});

//add user to following list in current user array

export const addFollowing = createAsyncThunk('post/addFollowing', async (authorId,thunkAPI) => {
  try {
    const {auth}=thunkAPI.getState();
    const {user}=auth;
    const response = await fetch(`${process.env.REACT_APP_API}/follow/${authorId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ followingUser: user._id }),

    });
    if (response.status === 200) {
      const resObject = await response.json();
      console.log(resObject);
      return resObject;
    } else {
      throw new Error("author rendering has failed!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
});

//remove user from following list in current user array

export const removeFollowing = createAsyncThunk('post/removeFollowing', async (authorId,thunkAPI) => {
  try {
    const {auth}=thunkAPI.getState();
    const {user}=auth;
    const response = await fetch(`${process.env.REACT_APP_API}/unfollow/${authorId}`, {
      method: "POST",
      credentials: "include",
      headers: {  
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ followingUser: user._id }),
    });
    if (response.status === 200) {  
      const resObject = await response.json();
      console.log(resObject);
      return resObject;
    } else {
      throw new Error("author rendering has failed!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
});

//update likes in post array

export const updateLikes = createAsyncThunk('post/updateLikes', async (id,thunkAPI) => {
  try {
    const {auth}=thunkAPI.getState();
    const {user}=auth;
    const response = await fetch(`${process.env.REACT_APP_API}/like/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ userId: user._id }),
    });
    if (response.status === 200) {
      const resObject = await response.json();
      return resObject;
    } else {
      throw new Error("author rendering has failed!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
});

//update bookmarks in post array

export const updateBookmarks = createAsyncThunk('post/updateBookmarks', async (id,thunkAPI) => {
  try {
    const {auth}=thunkAPI.getState();
    const {user}=auth;
    const response = await fetch(`${process.env.REACT_APP_API}/bookmark/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ userId: user._id }),
    });
    if (response.status === 200) {
      const resObject = await response.json();
      console.log(resObject);
      return resObject;
    } else {
      throw new Error("author rendering has failed!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
});

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setFollowingPosts: (state, action) => {
          state.followingPosts = action.payload;
      },
      setAuthor: (state, action) => {
        state.author = action.payload;
      },
      setFollowers: (state, action) => {
        state.followers = action.payload;
      }
      ,
      setFollowing: (state, action) => {
        state.following = action.payload;
      }
      ,
      setLikes: (state, action) => {
        state.likes = action.payload;
      }
      ,
      setBookmarks: (state, action) => {
        state.bookmarks = action.payload;
      }
    },
    extraReducers:{
        [fetchPosts.pending]:(state,action)=>{
            state.status="loading";
        }
        ,
        [fetchPosts.fulfilled]:(state,action)=>{
            state.status="succeeded";
            state.posts=action.payload;
        }
        ,
        [fetchPosts.rejected]:(state,action)=>{
            state.status="failed";
            state.error=action.error.message;
        },
        [fetchFollowingPosts.pending]:(state,action)=>{
          state.status="loading";
        }
        ,
        [fetchFollowingPosts.fulfilled]:(state,action)=>{
          state.status="succeeded";
          state.followingPosts=action.payload;
        }
        ,
        [fetchFollowingPosts.rejected]:(state,action)=>{
          state.status="failed";
          state.error=action.error.message;
        }
        ,
        [fetchAuthor.pending]:(state,action)=>{
          state.status="loading";
        }
        ,
        [fetchAuthor.fulfilled]:(state,action)=>{
          state.status="succeeded";
          state.author=action.payload;
        }
        ,
        [fetchAuthor.rejected]:(state,action)=>{
          state.status="failed";
          state.error=action.error.message;
        }
    }
});
export const {setPosts,setFollowingPosts,setAuthor,setFollowAuthor,setLikes,setBookmarks} = postSlice.actions;
export default postSlice.reducer;


 




