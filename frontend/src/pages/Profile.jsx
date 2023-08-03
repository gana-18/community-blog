import { useParams } from 'react-router-dom'
import Card from '../components/Card'
import { useSelector,useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import { fetchAuthor } from '../features/post/postSlice';
import Article from '../components/Article';
function Profile() {
  const {id}=useParams()
  const [author,setAuthor]=useState(null)
  const {user}=useSelector((state) => state.auth);
  const {posts}=useSelector((state) => state.post);

  const [userPosts,setUserPosts]=useState([])
  const dispatch=useDispatch()

  useEffect(()=>{
    const fetchAuthorprofile=async()=>{
      const response=await dispatch(fetchAuthor(id))
      setAuthor(response.payload)
    }
    fetchAuthorprofile()
  },[id,dispatch])

  useEffect(() => {
    const fetchUserPosts = async () => {
      const userPostsById = posts.filter(post => post.user === id);
      if (userPostsById) {
        setUserPosts(userPostsById);
      }
    };
    fetchUserPosts();
  }, [id,posts]);

      const userArray = author ? [author] : [];
      const card=userArray?.map(item=>(
        <Card
        key={item._id}
        user={item}
        />
      ));

      const contentCards=userPosts?.map(item=>(
        <Article
        key={item._id}
        item={item}
        />
      ))

  return (
    <>
    <div className='profile'>
        {card}
    </div>
    <div className='home'>
      <h2>Recent Activity</h2>
        {contentCards}
    </div>
    </>
    
  )
}

export default Profile