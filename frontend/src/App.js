import { useEffect,useState } from "react";
import {Routes,Route, Navigate} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { login} from './features/auth/authSlice'
import {fetchPosts,fetchFollowingPosts} from './features/post/postSlice';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import BlogInput from "./pages/Blog";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Bookmarks from "./pages/Bookmarks";
import Following from "./pages/Following";
function App() {
  const dispatch = useDispatch();
  const [user,setUser] = useState(null);
  const auth = useSelector((state) => state.auth);
  const [posts,setPosts] = useState(null);
  const post = useSelector((state) => state.post);
  const [followingPosts,setFollowingPosts] = useState(null);

  useEffect(() => {
    if(!auth.user){
      dispatch(login());
    }
    else{
      setUser(auth.user);
    }
  }, [dispatch,auth.user]);
  /*useEffect(() => {
    if (auth.status === 'idle') {
      dispatch(login());
    }
    if(auth.status === 'succeeded'){
      setUser(auth.user);
    }
    if(auth.status === 'failed'){
      setUser(null);
    }
  }, [auth.status, dispatch]);*/


  useEffect(() => {
    if (post.status === 'idle') {
      dispatch(fetchPosts());
    }
    if(post.status === 'succeeded'){
      setPosts(post.posts);
    }
    if(post.status === 'failed'){
      setPosts(null);
    }
  }, [post.status, dispatch]);


  
  useEffect(() => {
    if (post.status === 'idle') {
      if(user)
      dispatch(fetchFollowingPosts(user._id));
    }
    if(post.status === 'succeeded'){
      setFollowingPosts(post.followingPosts);
    }
    if(post.status === 'failed'){
      setFollowingPosts(null);
    }
  }, [post.status, dispatch]);
  const write = user ? `/post/create/${user._id}` : '/';
  const following=user? `/home/following/${user._id}` : `/`;
  console.log("user is",user)
  return (
    <>
        <div>
        <Header user={user}/>
          <Routes>
            <Route path="/" element={user? <Navigate to ="/home"/>:<Login/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path={following} element={<Home/>}/>
            <Route path= {write} element={<BlogInput/>}/>
            <Route path="/profile/:id" element={<Profile/>}/>
            <Route path="/post/:id" element={<Post/>}/>
            <Route path="/bookmarks" element={<Bookmarks/>}/>
            <Route path="/user/following" element={<Following/>}/>
          </Routes>
        </div>
    </>
    
  );
}

export default App;
