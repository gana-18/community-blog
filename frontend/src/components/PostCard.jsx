import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthor, updateLikes,updateBookmarks} from '../features/post/postSlice';
function PostCard(props) {
    const sanitizedContent = { __html: DOMPurify.sanitize(props.item?props.item.content:null) };
    const {user}=useSelector((state) => state.auth);
    const[likes,setLikes]=useState(props.item?props.item.likes:{})
    const [bookmarks,setBookmarks]=useState(user?user.bookmarks:{})
    console.log("bookmarks1",bookmarks)
    const dispatch = useDispatch();

    const handleLike=()=>{
        const userId = props.author ? props.author._id : null;
        if(userId){
            dispatch(updateLikes(props.item._id,user._id)).then((response)=>{
                setLikes(response.payload)
            })
        }
    }

    const handleBookmark = () => {
        const userId = props.author ? props.author._id : null;
        if (userId) {
            dispatch(updateBookmarks(props.item._id, user._id)).then((response) => {
                setBookmarks(response.payload);
            });
        }
    };
    console.log("likes state",likes,"bookmarks state",bookmarks)
  return (
    <div className="postcard">
        <div className="coverimage">
            <img src={props.item?props.item.coverImage:null} alt="coverImage" />
        </div>
        <div className="posttitle">
            <h1>{props.item?props.item.title:null}</h1>
            <div>
                <img src={props.author?props.author.profilePic:null} alt="avatar" />
                <h3>{props.author?props.author.firstName:null}</h3>
            </div>
        </div>
        <div className='postcontent'>
            <div dangerouslySetInnerHTML={sanitizedContent} />
        </div>
        <div className='postbutton'>
        <button onClick={handleLike}>
         {likes && user && likes[user._id]
         ?
         (<img src="http://localhost:3000/images/icons8-heart-suit-32.png" alt="like"/>)
         :
         (<img src="http://localhost:3000/images/icons8-heart-32.png" alt="like"/>)
         }
         </button>
         <span>{Object.keys(likes)?Object.keys(likes).length:0}</span>
         <button onClick={handleBookmark}>
            {bookmarks && user && bookmarks[props.item?props.item._id:null]
            ?
            (<img src="http://localhost:3000/images/icons8-bookmark-32 (1).png" alt="bookmark"/>)
            :
            (<img src="http://localhost:3000/images/icons8-bookmark-32.png" alt="bookmark"/>)
            }
         </button>
        </div>
    </div>
  )
}

export default PostCard