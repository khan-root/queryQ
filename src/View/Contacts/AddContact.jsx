import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import contactsApi from '../../Model/Data/Contact/contact'
import { showToast } from '../../Toaster/Toaster'
import { COUNTRIES_LIST } from '../Teams/utils/data'
import Select, { components } from 'react-select'
// import  from 'react-select';



const btnContianer ={
    display: 'flex',
    alignSelf: 'center'
}

const addButton = {
    backgroundColor: '#D0EEF1',
    color: '#2BB5C1',
    padding: '5px 1rem',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '13px'
}
const AddContact = (props) => {
    
    const {toggleState, tp_inbox_id, close} = props
    const { SingleValue, Option } = components;

   
    const options = COUNTRIES_LIST.map((country) => ({
        value: country.phonecode,
        label: `${country.country_name} (+${country.phonecode})`,
        imageSrc: `https://flagcdn.com/20x15/${country.country_code.toLowerCase()}.png`,

    }));

    const IconSingleValue = (props) => (
        <SingleValue {...props}>
            <img src={props.data.imageSrc} alt={props.data.label} />
        </SingleValue>
    );

    const CustomOption = (props) => (
        <Option {...props} >
            <img src={props.data.imageSrc} alt={props.data.label} className="option-flag" />
            {props.data.label}
        </Option>
    );
    
    const [values, setValues] = useState({
        contactName: '',
        countryCode: '',
        contactNumber: '',
        contactEmail:'',
        opt_in:1,
        dpLink: '0',
    })
    const handleCountrySelect = (selectedOption)=>{
        const cCode = selectedOption.value
        setValues((prevState)=>({
            ...prevState,
            countryCode: cCode
        }))

    }
    
  



     // from cookies 
        const action_by = 10268458;
        const org_id = 9677375
    // .........

    const handleChange = (e) => {
        const { name, value } = e.target;

    
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };


    const whatsAppValues = {name: values.contactName, tp_inbox_id:16, opt_in: values.opt_in, tp_uid: values.countryCode+values.contactNumber, email:'', org_id: org_id, dpLink: values.dpLink}
    // const emaiValues = {name: values.contactName, tp_inbox_id:tp_inbox_id, opt_in: values.opt_in, tp_uid:null, email:values.contactEmail, org_id: org_id, dpLink: values.dpLink}


    const validateWAppForm = ()=>{
        if (!values.contactName) {
            showToast(`Contact name required`, 'error');
            return;
        }else if (/^\s*$/.test(values.contactName)) {
            showToast(` Contact name can't be empty`, 'error');
            return;
        }else if (/^[\s]+/.test(values.contactName)) {
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
        else if (values.contactNumber.length !== 10) {
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
    const validateEmailForm = ()=>{
        if (!values.contactName) {
            showToast(`Contact name required`, 'error');
            return;
        }else if (/^\s*$/.test(values.contactName)) {
            showToast(` Contact name can't be empty`, 'error');
            return;
        }else if (/^[\s]+/.test(values.contactName)) {
            showToast(`Remove spaces from the start of contact name`, 'error');
            return;
        }
        if (!values.contactEmail) {
            showToast(`Email required`, 'error');
            return;
        }
        else if (/^\s*$/.test(values.contactEmail)) {
            showToast(`Email can't be empty`, 'error');
            return;
        }
        else if (/^[\s]+/.test(values.contactEmail)) {
            showToast(`Remove spaces from the start of email`, 'error');
            return;
        }
        else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(values.contactEmail)) {
            showToast(`Enter valid email`, 'error');
            return;
        }


        return true
    }
    
// const validateField = (value, fieldName, fieldType) => {
//   if (!value) {
//     showToast(`${fieldName} required`, 'error');
//     return false;
//   }
//   if (/^\s*$/.test(value)) {
//     showToast(` ${fieldName} can't be empty`, 'error');
//     return false;
//   }
//   if (/^[\s]+/.test(value)) {
//     showToast(`Remove spaces from the start of ${fieldName}`, 'error');
//     return false;
//   }
//   if (fieldType === 'email') {
//     const isValidEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value);
//     console.log('Is valid email:', isValidEmail);
//     console.log('Email value:', value);
//     if (!isValidEmail) {
//       showToast(`Enter a valid email address`, 'error');
//       return false;
//     }
//   }
//   if (fieldType === 'number' && /[^a-zA-Z0-9\s]/.test(value)) {
//     showToast(`Remove special characters from ${fieldName}`, 'error');
//     return false;
//   }

//   return true;
// };



// const validateForm = (fieldType) => {
//   if (toggleState === 1) {
//     if (!validateField(values.contactName, 'Contact name', fieldType)) {
      
//     }
//     if (fieldType === 'number' && !validateField(values.contactNumber, 'Contact number', fieldType)) {
      
//     }
//   } else if (toggleState === 3) {
//     if (!validateField(values.contactName, 'Contact name', fieldType)) {
//     //   return false;
//     }
//     if (fieldType === 'email' && !validateField(values.contactEmail, 'Email', fieldType)) {
//     //   return false;
//     }
//   }

//   return true;
// };


const handleFormSubmit = async (e) => {
  e.preventDefault();

  if (toggleState == 1) {
    if (validateWAppForm()) {
      // Form 1 (Name and Number) is valid
        try{

            const response = await contactsApi.addContact(whatsAppValues)
            const data = response.data 
            if(response.status === 200){
                if(data.STATUS === "SUCCESSFUL"){
                    close()
                    showToast('User successfully added', 'success')
                }
            }
        }catch(err){
            const response = err.response.data
            showToast(`${response.ERROR_DESCRIPTION}`, 'error')

        }
    }
  } 
   else if (toggleState == 3) {
       if (validateEmailForm()) {
        console.log('Email', `'${values.contactEmail}'`);
      // Form 3 (Name and Email) is valid
    }
  }
};


    // const handleFormSubmit = async(e)=>{
    //     e.preventDefault()
    //     const valid = validateForm()
    //     if(valid){

        
    //         if(toggleState === 1){
    //             // const response = await contactsApi.addContact(whatsAppValues)
    //             // console.log(response)
    //             console.log('Whatsapp')
    //         }
    //         if(toggleState === 3){
    //             // console.log(emaiValues)
    //             console.log('email')
    //         }
    //     }
    // }

    const renderFormElement = () => {
        if(toggleState === 1){
            return(
                <div className='contactContainer'>
                    <div className="inputSection">
                        <label>Contact Name</label>
                        <input type="text" name='contactName' placeholder="Enter Contact Name"  onChange={handleChange} />
                    </div>
                    <div className="ContactNumber">
                        <label>Number</label>
                        <div className='ContactNumberContainer'>
                            <div className='countrySelect'>
                                <Select
                                    options={options}
                                    components={{ SingleValue: IconSingleValue, Option: CustomOption, IndicatorSeparator: null }}
                                    onChange={(selectedOption)=> handleCountrySelect(selectedOption)}
                                    styles={{
                                        control: base => ({
                                            ...base,
                                            fontSize: 10,
                                            boxShadow: 'none',
                                            outline: 'none',
                                            border: 'none',
                                            borderRadius: '0',
                                            padding: '0',
                                        }),
                                        placeholder: base => ({
                                            ...base,
                                            color: '#999',
                                        }),
                                        input: base => ({
                                            ...base,
                                            padding: 0,
                                            margin: 0,
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            width: '400px', // Set your desired width here
                                        }),
                                        option:(base)=>({
                                            ...base, 
                                            fontSize:'13px'
                                        })
                                    }}
                                
                                />
                            </div>
                            
                            <div className='number'>
                                <input type="text" name='contactNumber' placeholder="3118787909"  onChange={handleChange} className='input' />
                            </div>
                        </div>
                    </div>
                    <div style={btnContianer}>
                        <button style={addButton}>Add Contact</button>
                    </div>
                </div>
            )
        }
        else if(toggleState === 3){
            return(
                <div className='emailContainer'>
                    <div className="inputSection" >
                        <label>Contact Name</label>
                        <input type="text" name='contactName' placeholder="Enter Contact Name"  onChange={handleChange}/>
                    </div>
                    <div className="inputSection">
                        <label>Email</label>
                        <input  name='contactEmail' placeholder="Enter Email"  onChange={handleChange}/>
                    </div>
                    <div style={btnContianer}>
                        <button style={addButton}>Add Contact</button>
                    </div>
                </div>
            )
        }
    }
  return (
    <Form onSubmit ={handleFormSubmit} className='addContactForm'>
        {renderFormElement()}
    </Form>
  )
}

export default AddContact