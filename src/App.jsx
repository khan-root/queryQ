import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/main.scss'
import { Header, SideMenu } from './Components';
import useStore from './store/store';
import { useEffect, useState } from 'react';
import { Toaster } from './Toaster/Toaster';
import useSocketConnection from './Socket/Socket';
import { getCookie } from './Model/cookiesServices';



const App = () => {

  const [login, setLogin ] = useState(false)
  const getAllDashboard = useStore((state)=> state.getAllDashboard)
  const getOnlineUser = useStore((state)=> state.getOnlineUser)
 
  const {socketConnection} = useSocketConnection()


  


  useEffect(() => {
    const cookieValue = getCookie();

    if (!cookieValue) {
      window.location.href = 'https://oneid.veevotech.com/login?app_id=gaP5zub5X99sm'
    } else {
      
      window.location.href = 'http://localhost:3000'
      // Your other logic here
      socketConnection();
      getAllDashboard();
      getOnlineUser();
      setLogin(true)
    }
  }, []);
  return (
    <>
    {login &&  <div>
        <Header />
        <Toaster />
        <SideMenu />
      </div>}
    </>
  )
}

export default App
