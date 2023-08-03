import Header2 from "./Header2";
function Header({user}) {

  return (
    <>
      {user ? <Header2 user={user}/> : 
    <>
      <div className="nav">
        <div className="logo">
          <img src="/images/icons8-community-32 (1).png" alt="logo" />
          <h1>INSIDECODE</h1>
        </div>
      </div>
    </>  
}
    </>
   
  )
}

export default Header
