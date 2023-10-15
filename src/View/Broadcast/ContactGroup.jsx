import React from 'react'
import { Table } from 'react-bootstrap'

const ContactGroup = (props) => {
    const {data} = props 
    // console.log(data)
    
  return (
    <div className='contactGroupContainer'>
        <Table striped>
            <thead>
                <tr className='tableHeader'>
                    <th>Contact name</th>
                    <th>Contact#</th>
                </tr>
            </thead>
            <tbody>
                {data.contacts.map((ele)=>(
                    <tr key={ele._id}>
                        <td>
                            <div className='userNameImg'>

                                <img src='https://images.pexels.com/photos/16832146/pexels-photo-16832146/free-photo-of-light-dawn-landscape-night.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='userImg'  style={{width: '30px', height: '30px', borderRadius: '50%'}}/>
                                <span >{ele.name}</span>
                            </div>
                        </td>
                        <td>{`0${ele.tp_uid}`}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
  )
}

export default ContactGroup