import Button from '../Button/Button'
import OffCanvas from '../OffCanvas/OffCanvas'
import './svg.scss'
import { useState } from 'react'




const SVG = (props) => {
  const {firstText, secondText, compo, gif, showBtn = true, width, height} = props
  const [show, setShow] = useState(false)

  const handleClose = () =>{
    setShow(false)
  }
  return (
    <>
    <div className='svgMain'>
      <div>
        <img src={gif} alt='gif' width={ width ? width : 350} height={height ? height : 250}/>
      </div>
      <div className='svgText'>
        <span>{firstText}</span>
        <span>{secondText}</span>
      </div>
      <div className='newCon'>
        {showBtn && 
          <Button 
            variant = 'primaryBtn'
            text = 'Create new'
            onClick={()=>setShow(true)}
          />
        }
      </div>
    </div>
    <OffCanvas 
        show = {show}
        handleClose = {handleClose}
        placement = 'end'
        title= 'New Template Message'
        children= {compo}
        style={{width: '60vw'}}
      />
    
    </>
  )
}


export default SVG