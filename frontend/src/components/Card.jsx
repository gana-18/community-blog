function Card(props) {  
    let followersCount = props.user.followers.length;  
    let followingCount = props.user.following.length;
    let memberSince = props.user.createdAt;
  return (
    <div className="card">
        <div className="card-left">
            <img src={props.user.profilePic} alt="" />
        </div>
        <div className="card-right">
            <h2>{props.user.firstName} {props.user.lastName}</h2>
            <div>
                <strong>{followersCount}</strong><span>Followers</span>
                <strong>{followingCount}</strong><span>Following</span>
            </div>
            <p>Member since {memberSince}</p>
        </div>
    </div>
  )
}

export default Card