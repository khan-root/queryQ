import { useState } from 'react'
import { Dropdown, Form } from 'react-bootstrap'
import { socialIcons } from '../../Utils/Data' 
import { Button } from '../../Components'

const channelOptions = ['facebook', 'email', 'whatsapp', 'twitter', 'instagram']
const AddNewChannel = () => {

    const [selectChannel, setSelectedChannel] = useState('')

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

  return (
    <div>
        
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
                            <span style={{color: socialIcons[channel].color}}>{socialIcons[channel].icon()}</span>
                            <span>
                                {channel.charAt(0).toUpperCase() + channel.slice(1)}
                            </span>
                        </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
        </Form.Group>

        <Form.Group className="mb-1" controlId="formBasicLabel">
            <Form.Label>Label</Form.Label>
            <Form.Control type="text" placeholder="Enter Label" style={formInput}/>
        </Form.Group>
        <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" style={formInput}/>
        </Form.Group>
        <Form.Group className="mb-1" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" style={formInput}/>
        </Form.Group>
        <Form.Group className="mb-1" controlId="formBasicIMAPHost">
            <Form.Label>IMAP Host</Form.Label>
            <Form.Control type="text" placeholder="Enter IMAP Host" style={formInput}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicIMAPPost">
            <Form.Label>IMAP Port</Form.Label>
            <Form.Control type="text" placeholder="Enter IMAP Port" style={formInput}/>
        </Form.Group>
        
        <Button 
            variant='primaryBtn'
            text = 'Add new'
            padding='2px 15px'
        />
    </Form>
    </div>
  )
}

export default AddNewChannel