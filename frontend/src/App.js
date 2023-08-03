import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { login } from './features/auth/authSlice';
import { fetchPosts, fetchFollowingPosts } from './features/post/postSlice';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import BlogInput from "./pages/Blog";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Bookmarks from "./pages/Bookmarks";
import Following from "./pages/Following";

function App() {
  // Initialize Redux dispatch function
  const dispatch = useDispatch();

  // Local state to manage the user and posts data
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [followingPosts, setFollowingPosts] = useState(null);

  // Get authentication and post state from Redux store
  const auth = useSelector((state) => state.auth);
  const post = useSelector((state) => state.post);

  // Dispatch the login action once when the component mounts
  useEffect(() => {
    if (auth.status === 'idle') {
      dispatch(login());
    }
  }, [auth.status, dispatch]);

  // Update the local user state based on the authentication status
  useEffect(() => {
    if (auth.status === 'succeeded') {
      setUser(auth.user);
    } else if (auth.status === 'failed') {
      setUser(null);
    }
  }, [auth.status]);

  // Fetch the posts once when the component mounts
  useEffect(() => {
    if (post.status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [post.status, dispatch]);

  // Update the local posts state based on the fetch status
  useEffect(() => {
    if (post.status === 'succeeded') {
      setPosts(post.posts);
    } else if (post.status === 'failed') {
      setPosts(null);
    }
  }, [post.status]);

  // Fetch the following posts once when the component mounts and user data is available
  useEffect(() => {
    if (post.status === 'idle' && user) {
      dispatch(fetchFollowingPosts(user._id));
    }
  }, [post.status, dispatch, user]);

  // Update the local followingPosts state based on the fetch status
  useEffect(() => {
    if (post.status === 'succeeded') {
      setFollowingPosts(post.followingPosts);
    } else if (post.status === 'failed') {
      setFollowingPosts(null);
    }
  }, [post.status]);

  // Define the paths for routing
  const write = user ? `/post/create/${user._id}` : '/';
  const following = user ? `/home/following/${user._id}` : `/`;

  // Return the JSX for the App component
  return (
    <>
      <div>
        <Header user={user} />
        <Routes>
          <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
          <Route path="/home" element={<Home />} />
          <Route path={following} element={<Home />} />
          <Route path={write} element={<BlogInput />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/user/following" element={<Following />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
