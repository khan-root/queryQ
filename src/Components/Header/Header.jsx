import { BiBell } from 'react-icons/bi'
import './header.scss'
import logo from '../../assets/Images/query-q-logo.png'
import userImage from '../../assets/Images/user.jpg'
import { Container, Nav, Navbar } from 'react-bootstrap'

const Header = () => {
  return (
    <Navbar className='main'sticky="top">
      <Container fluid> 
          <img src={logo} alt='logo' className='logo' />
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            ></Nav>
          <div className='account'>
            <div className='accountLLeft'>
            <span className='notificationIcon'><BiBell /></span>
            <span className='notificationCount'>4</span>
          </div>
          <div className='accountRight'>
           <img src={userImage} alt='user' className='userImage' />
           <span className='activeAccount'></span>
          </div>
        </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header