import {Link} from "react-router-dom";
import React, {useState, useEffect} from 'react'
import Write from "./Write";
function Header2({user}) {
    const logout = ({user}) => {
        window.open(`${process.env.REACT_APP_API}/auth/logout`,"_self")
    }
    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
    }
    useEffect(() => {

        const changeWidth = () => {
          setScreenWidth(window.innerWidth);
        }
    
        window.addEventListener('resize', changeWidth)
    
    }, [])
    const linkStyle = {
        textDecoration:'none',
        color:'#64748B',
        fontWeight:'600',
    }
    const imgStyle = {
        width:'2.5em',
        height:'2.5em',
        borderRadius:'50%',
        margin:'0 1em'
    }
  return (
    <>
    <div className="nav2">
      <div className="logo">
      <img src="http://localhost:3000/images/icons8-community-32 (1).png" alt="logo" />
          <h1>INSIDECODE</h1>
      </div>
      <nav>
      {(toggleMenu || screenWidth > 850) && (
      <ul className="list">
      <li className="items"><Link to='/home' style={linkStyle}>My Feed</Link></li>
      <li className="items"><Link to='/bookmarks' style={linkStyle}>Bookmarks</Link></li>
        <li className="items"><Write user={user}/></li>
      <li className="items"><Link to='/' style={linkStyle} onClick={logout}>Logout</Link></li>
      <li className="items"><Link to={`/profile/${user._id}`}style={linkStyle}><img style={imgStyle} src={user.profilePic} alt="user" /> </Link></li>
    </ul>
      )}

      <button onClick={toggleNav} className="btn">BTN</button>
    </nav>
    </div>
    </>
    )
}

export default Header2
