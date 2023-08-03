import { useState } from "react"
import AuthorCard from "../components/AuthorCard"
function Following() {
    const [followingClicked,setFollowingClicked]=useState(false)
    function clicked(){
        setFollowingClicked(prev=>!prev)
    }
    console.log(followingClicked)
  return (
    <div className="Following">
        <div className="follow-card">
            <button onClick={clicked}>Following</button>
            <button onClick={clicked}>Followers</button>
        </div>
        <div className="users">
            <AuthorCard/>
        </div>
    </div>
  )
}

export default Following