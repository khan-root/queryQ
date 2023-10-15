import React, { useState } from 'react'
import { Dropdown, Form } from 'react-bootstrap'
import { FaFacebookF } from 'react-icons/fa'
import { socialIcons } from '../../Utils/Data'

const channelOptions = ['email', 'facebook', 'whatsapp',]
  const dropdown = {
        width: `100%`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#fff',
        border: '2px solid #DCDCDC',
        color: '#ccc',
        borderRadius: '10px'
    }
    const dropdownMenu = {
        width: '100%',
        
    }
    const dropdownItem = {
        display: 'flex',
        alignItems: 'center',
        gap:'10px',
        margin: '5px 0',
        padding: '0 5px'
    }
    const formInput = {
        borderRadius : '10px',
        oultine: 'none'
    }

    const facebookContainer={
        // border: '1px solid black',
        display: 'flex',
        alignItems: 'center',
        width: '280px',
        cursor: 'pointer'

    }
    const facebookIcon = {
        flex: '0.1',
        background: '#2BB5C1',
        color: '#fff',
        padding: '10px 15px',
        borderTopLeftRadius: '20px', // Radius for the top-left corner
        borderBottomLeftRadius: '20px'
    }
    const facebookDesc = {
        flex: '0.9',
        background: '#D6F2F4',
        color: '#2BB5C1',
        padding: '10px 15px',
        borderTopRightRadius: '20px', // Radius for the top-Right corner
        borderBottomRightRadius: '20px'
    }
    const submitBtn ={
        background: '#D0EEF1',
        color: '#2BB5C1',
        padding: '0.3rem 1rem',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer'
    }

const NewChannel = () => {  
    const [selectChannel, setSelectedChannel] = useState('')
    const renderFormElement = () => {
    if (selectChannel === 'email') {
        return (
            <>
                <Form.Group className="mb-1" controlId="formBasicLabel">
                    <Form.Label>Label</Form.Label>
                    <Form.Control type="text" placeholder="Enter Label" style={formInput} />
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" style={formInput} />
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" style={formInput} />
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicIMAPHost">
                    <Form.Label>IMAP Host</Form.Label>
                    <Form.Control type="text" placeholder="Enter IMAP Host" style={formInput} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicIMAPPost">
                    <Form.Label>IMAP Port</Form.Label>
                    <Form.Control type="text" placeholder="Enter IMAP Port" style={formInput} />
                </Form.Group>
                <button style={submitBtn}>
                    Submit
                </button>

            </>
        );
    }if (selectChannel === 'facebook') {
        return(
            <div style={facebookContainer}>
                <div style={facebookIcon}>
                    <span><FaFacebookF /></span>
                </div>
                <div style={facebookDesc}>
                    <span>Continue with facebook</span>
                </div>
            </div>
        )
    }if(selectChannel === 'whatsapp'){
        return(
            <>
                <Form.Group className="mb-1" controlId="formBasicLabel">
                    <Form.Label>Label</Form.Label>
                    <Form.Control type="text" placeholder="Enter Label" style={formInput} />
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                    <Form.Label>API Key (360 Dialog)</Form.Label>
                    <Form.Control type="email" placeholder="Enter API Key" style={formInput} />
                </Form.Group>
                <button style={submitBtn}>Submit</button>
            </>
        )
    }

    // Add more cases for other channels if needed

    return null; // Return null if no form elements should be rendered
    };


    
  
  return (
    <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Inbox</Form.Label>
            <Dropdown>
                <Dropdown.Toggle  id="dropdown-basic" style={dropdown}>
                    {selectChannel ? 
                        <span>{selectChannel.charAt(0).toUpperCase() + selectChannel.slice(1)}</span>
                        :
                            
                        <span>Select One</span> 
                        
                    }
                </Dropdown.Toggle>

                <Dropdown.Menu style={dropdownMenu}>
                    {channelOptions.map(channel => (
                    <Dropdown.Item key={channel} onClick={()=>setSelectedChannel(channel)} style={dropdownItem}>
                        <span style={{color: socialIcons[channel].color}}>{socialIcons[channel].icon()} </span>
                        <span>
                            {channel.charAt(0).toUpperCase() + channel.slice(1)}
                        </span>
                    </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </Form.Group>


        {renderFormElement()}
        
    </Form>
  )
}

export default NewChannel