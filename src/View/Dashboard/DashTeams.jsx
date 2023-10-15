import './dashboard.scss'
import { BsBarChartLine } from 'react-icons/bs'
import { RiUserFollowLine } from 'react-icons/ri'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'




const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={
      "slick-prev slick-arrow"
    }
    aria-hidden="true"
    aria-disabled={currentSlide === 0 ? true : false}
    type="button"
  >
  </button>
);
const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={
      "slick-next slick-arrow"
    }
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1 ? true : false}
    type="button"
  >
  </button>
);


const DashTeams = (props) => {
    const { teamData , onlineUsers } = props 


    const settings = {
        infinite: true,   
        // slidesToShow: Math.min(3, onlineUsers.length),
        slidesToShow: onlineUsers.length < 3 ? onlineUsers.length : 3,  
        
        centerPadding: '5px',      
        speed: 600,
        nextArrow: <SlickArrowRight />,
        prevArrow: <SlickArrowLeft />,
    };



  return (
    <div className='container-fluid p-0 teamsMain'>
        <div className='teamsContainer'>
            
            <div>
                <span className='teamsTitle'>Teams</span>
            </div>
            
            <div className='teamsCount'>
                <div className='teamsTotal'>
                    <span className='teamsIcon'><RiUserFollowLine /></span>
                    <div className='teamsInfo'>
                        <span className='teamsInfoTotalTeam'>{teamData.totalTeam}</span>
                        <span className='teamsInfoText'>Total Teams</span>
                    </div>
                </div>
                <div className='verticalHr'></div>
                <div className='teamsTotal'>
                    <span className='teamsIcon'><BsBarChartLine /></span>
                    <div className='teamsMemeber'>
                        <span className='teamsMemberTotal'>{teamData.totalTeamMember}</span>
                        <span className='teamsMemberText'>Total members <br /> inside team</span>
                    </div>
                </div>
            </div>
            <div className='dashOnlineUsers'>
                <span className='onlineUserTitle'>Online Users</span>
                <div className='dashOnlineUsersSlider'>
                        <Slider {...settings} className='mainSlider'>
                            {onlineUsers.map((ele, i) => (
                            <div key={i} className='sliderList'>
                                <img src={ele.full_dp} alt='userImage'  />
                                <span></span>
                            </div>
                            ))}
                        </Slider>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashTeams