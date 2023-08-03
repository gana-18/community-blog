import { Link } from 'react-router-dom';
function Write({user}) {
  const url=`/post/create/${user._id}`
  return (
    <div className="write">
      <a href= {url}>
        <button>
          <img src="http://localhost:3000/images/icons8-write-32.png" alt="pen" />
          Write
        </button>
      </a>
    </div>
  )
}

export default Write