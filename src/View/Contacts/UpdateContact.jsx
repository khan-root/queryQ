import React from 'react'
import { useState } from 'react'
import { Button } from '../../Components'
import contactsApi from '../../Model/Data/Contact/contact'
import useContact from '../../ViewModel/ContactsViewModel/contactsServices'
import { showToast } from '../../Toaster/Toaster'

const UpdateContact = (props) => {
    const {close , data} = props 
    const { contactEdit } = useContact()
    console.log(data)

    const [values, setValues] = useState({
        name: data.name,
        contactNumber: data.tp_uid,
        id: data._id
    })

    const handleUpdateChange = (e)=>{
        const {name, value} = e.target 

        setValues((prevState)=>({
            ...prevState,
            [name]: value
        }))
    }
    const validateForm = ()=>{
        if (!values.name) {
            showToast(`Contact name required`, 'error');
            return;
        }else if (/^\s*$/.test(values.name)) {
            showToast(` Contact name can't be empty`, 'error');
            return;
        }else if (/^[\s]+/.test(values.name)) {
            showToast(`Remove spaces from the start of contact name`, 'error');
            return;
        }
        if (!values.contactNumber) {
            showToast(`Contact number required`, 'error');
            return;
        }
        else if (/^\s*$/.test(values.contactNumber)) {
            showToast(` Contact name can't be empty`, 'error');
            return;
        }
        else if (/[^0-9]/.test(values.contactNumber)) {
            showToast(`Contact number must contain only numbers`, 'error');
            return;
        }
        else if (/^[\s]+/.test(values.contactNumber)) {
            showToast(`Remove spaces from the start of contact number`, 'error');
            return;
        }
        else if (values.contactNumber.length !== 12) {
            showToast(`Invalid Number `, 'error');
            return;
        }
        // add check length of number 11
        // else if (!values.contactNumber.length > 11) {
        //     showToast(`C`, 'error');
        //     return;
        // }


        return true
    }

    const updateContactHandler = async(e)=>{
        e.preventDefault()
        const valid = validateForm()
        
        const editContact = {
            name: values.name, 
            tpUid: values.contactNumber
        }
        if(valid){

        
            const response = await contactsApi.updateContact(values.id, editContact)

            const data = response.data 
            if(response.status === 200 && data.STATUS === "SUCCESSFUL"){
                const result = data.updating_all_the_data 
                close()
                contactEdit(result)
                showToast('Contact updated successfully', 'success')
            }
        }

    }
  return (
    <div className='updateContactForm'>
        <form onSubmit={updateContactHandler}>
            <div className='name'>
                <label>Name</label>
                <input name='name' placeholder='Enter Name' value={values.name} onChange={handleUpdateChange} />
            </div>
            <div className='contactNumber'>
                <label>Number</label>
                <input name='contactNumber' placeholder='923118787909' value={values.contactNumber} onChange={handleUpdateChange} />
            </div>
            <div>
                <Button 
                    text='Update'
                    variant='primaryBtn'
                    fontSize='13px'
                />
            </div>
        </form>
    </div>
  )
}

export default UpdateContact