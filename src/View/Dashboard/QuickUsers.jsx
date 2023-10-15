import './dashboard.scss'


const QuickUsers = (props) => {
  const { data } = props
  return (
    <div className='mainUsers'>
        <div className='usersContainer'>
          <span className='usersTitle'>Top 3 Quick Users</span>


          <div className='usersLists'>
            {data?.map((user, index)=>(
              <div className='userList' key={user._id}>
                <div className='userInfo'>
                  
                  <span className={`userNumber userNumber-${index}`}>{index +  1}</span>
                  <span className={`userLine userLine-${index}`}></span>
                  <img className={`userImage userImage-${index}`} src={user.full_dp} alt='user' />
                </div>
                  <div style={{width: '175px'}}>
                    <span className={`userName userName-${index}`}>{user.full_username}</span>
                  </div>
                  <div className='userVerticalHr'></div>
                  <div className='userTime'>
                    <span>2m/s</span>
                  </div>
              </div>
            ))}
            
          </div>

        </div>
    </div>
  )
}

export default QuickUsers