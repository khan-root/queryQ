
export const getCookie = () => {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=');
      if (cookie[0] === 'myCookieName') {
        console.log('Cookie Value:', cookie[1]);
         return cookie[1]; 
      }
    }
    console.log('Cookie not found', cookies);
    return null
  };