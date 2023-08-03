function Write({user}) {
  const url=`/post/create/${user._id}`
  return (
    <div className="write">
      <a href= {url}>
        <button>
          <img src="/images/icons8-write-32.png" alt="pen" />
          Write
        </button>
      </a>
    </div>
  )
}

export default Write