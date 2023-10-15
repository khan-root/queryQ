import React, { useState } from 'react'
import Button from '../../Components/Button/Button'
import { COUNTRIES_LIST } from './utils/data'
import Select from 'react-select'
import teamApi from '../../Model/Data/Team/Team'
import { showToast } from '../../Toaster/Toaster'

const AddNewUser = (props) => {
  const {close} = props 
  const [checkError, setCheckError] = useState('')

  const radioOptions = [
    {id: 1, value: 'MALE', name: 'male'},
    {id: 2, value: 'FEAMALE', name: 'female'},
    {id: 3, value: 'OTHER',  name: 'other'},
  ]
  const netwrokOption = [
    {id: 1, value: 'Mobilink-PK', name: 'Mobilink'},
    {id: 2, value: 'Zong-PK', name: 'Zong'},
    {id: 3, value: 'Ufone-PK',  name: 'Ufone'},
    {id: 4, value: 'Telenor-PK',  name: 'Telenor'},
  ]
  const roleOptions = [
    {id: 1, value: 'Admin', name: 'Admin'},
    {id: 2, value: 'Agent', name: 'Agent'},
  ]

  const [values, setValues] = useState({
    fullname: '',
    gender: '',
    dob: '',
    mobile_network:'Mobilink-PK',
    email: '',
    mobile_no: '',
    grant_role: 'Admin',
    password: '' ,
    permissions: 'ALL',
    country_code: '',
    country_id: ''
  })

  function handleChange(e){
    const {name, value} = e.target 
    if (e.target.type === 'radio') {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value
      }));
    }

  }

  

  
  const options = COUNTRIES_LIST.map((country) => ({
    value: country.phonecode,
    label: `${country.country_name} (+${country.phonecode})`
  }));
  const countryId = COUNTRIES_LIST.map((country) => ({
    value:`${country.country_code}#${country.id}`,
    label: `${country.country_name} #(${country.id})`
  }));

  const handleSelectChange = (selectedOption) => {
    setValues((prevValues) => ({
      ...prevValues,
      country_code: `+${selectedOption.value}`,
    }));
  };
  const handleCountryId = (selectedOption) => {
    setValues((prevValues) => ({
      ...prevValues,
      country_id: selectedOption.value,
    }));
  };

  // const [errors, setErrors] = useState({});


  const validateForm = () => {
    // const newErrors = {};

    if (!values.fullname) {
      // newErrors.fullname = 'Full name is required';
      showToast('Full name is required', 'error')
      return
    }
    if (!values.gender) {
      // newErrors.gender = 'Select Gender';
      showToast('Select Gender', 'error')
      return
    }
    if (!values.country_code) {
      // newErrors.country_code = 'Select Country Code';
      showToast('Select Country Code', 'error')
      return
    }
    if (!values.country_id) {
      // newErrors.country_id = 'Select Country Id';
      showToast('Select Country Id', 'error')
      return
    }
    if (!values.dob) {
      // newErrors.dob = 'Select Date of Birth';
      showToast('Select Date of Birth', 'error')
      return
    }
    if (!values.email) {
      // newErrors.email = 'Email is required';
      showToast('Email is required', 'error')
      return
    }
    if (!values.mobile_no) {
      // newErrors.mobile_no = 'Mobile Number is required';
      showToast('Mobile Number is required', 'error')
      return
    }
    if (!values.password) {
      // newErrors.password = 'Password is required';
      showToast('Password is required', 'error')
      return
    }else if (!/[a-zA-Z]/.test(values.password) || !/[0-9]/.test(values.password)) {
      // newErrors.password = 'Password must contain both letters and numbers';
      showToast('Password must contain both letters and numbers', 'error')
      return 
    }
    
    
    return true
    // setErrors(newErrors);
    // return Object.keys(newErrors).length === 0;
  }

  const submitHandler = async(e)=>{
    e.preventDefault()
    const isValid = validateForm();
    setCheckError('Please check for errors')
    if(isValid){
      setCheckError('')
      const response = await teamApi.addNewMember(values)
      const result = response.data
      if(response.status == 200){
        if(result.STATUS === "ERROR"){
          setCheckError(result.ERROR_DESCRIPTION)
        }else{
          close()
          showToast('New user added successfully', 'success')

        }
      }
      console.log(response)
    }
  }

  return (
    <div className='addNewUserForm'>
      <form onSubmit={submitHandler} className='d-flex flex-column gap-2'>
        
        <div className='d-flex flex-column gap-1'>
          <label>Full Name</label>
          <div className='inputField'>
            <input type='text' name ='fullname'  placeholder='Enter full name' onChange={handleChange}/>
          </div>
          {/* <span>{errors.fullname}</span> */}
        </div>
        <div className='d-flex flex-column gap-1'>
          <label>Gender</label>
          <div className='d-flex gap-3'>
            {radioOptions.map((radioOption)=>(
              <div key={radioOption.id} className='d-flex gap-1'>
                <input type='radio' value={radioOption.value}  name='gender' onChange={handleChange}/>
                <label>{radioOption.name}</label>
              </div>
            ))}
          </div>
          {/* <span>{errors.gender}</span> */}
        </div>
        <div className='d-flex flex-column gap-1'>
          <label>Country code</label>
          <div className='selectCountry'>
            <Select
              options = {options}
                className='selectCountryInner'
                components={{ IndicatorSeparator: null }} // Corrected component key
                onChange={handleSelectChange}
                
                placeholder={     
                  'Select Country Code'
                }
                
                styles={{
                    control: base => ({
                      ...base,
                        height: 20,
                        fontSize: 15,
                        // padding: '0 8px',
                        boxShadow: 'none',
                        outline: 'none',
                        border: 'none'
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
              }}
            />
          </div>
          {/* <span>{errors.country_code}</span> */}
        </div>
        <div className='d-flex flex-column gap-1'>
          <label>Country code</label>
          <div className='selectCountry'>
            <Select
              options = {countryId}
                className='selectCountryInner'
                components={{ IndicatorSeparator: null }} // Corrected component key
                onChange={handleCountryId}
                
                placeholder={     
                  'Select Country ID'
                }
                
                styles={{
                    control: base => ({
                      ...base,
                        height: 20,
                        fontSize: 16,
                        padding: '0 8px',
                        boxShadow: 'none',
                        outline: 'none',
                        border: 'none'
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
              }}
            />
          </div>
                {/* <span>{errors.country_id}</span> */}
        </div>
        <div className='d-flex flex-column gap-1'>
          <label>Date of birth</label>
          <div className='inputField'>
            <input type='date' name = 'dob' onChange={handleChange}/>
          </div>
          {/* <span>{errors.dob}</span> */}
        </div>
        <div className='d-flex flex-column gap-1'>
          <label>Email</label>
          <div className='inputField'>
            <input type='email' name='email' placeholder='Enter eamil' onChange={handleChange}/>
          </div>
          {/* <span>{errors.email}</span> */}
        </div>
        <div className='d-flex flex-column gap-1'>
          <label>Mobile No</label>
          <div className='inputField'>
            <input type='text' name= 'mobile_no' placeholder='03116767565' onChange={handleChange}/>
          </div>
          {/* <span>{errors.mobile_no}</span> */}
        </div>
        <div className='d-flex flex-column gap-1'>
          <label>Mobile Network</label>
          <div className='selectField'>
            <select  onChange={handleChange} name='mobile_network'>
                {netwrokOption.map((ele, i)=>(
                  
                  <option key={i} value={ele.value}>{ele.name}</option>
                ))}
            </select>
          </div>
          
        </div>
        <div className='d-flex flex-column gap-1'>
          <label>Role</label>
          <div className='selectField'>
            <select onChange={handleChange} name='grant_role'>
                {roleOptions.map((ele, i)=>(
                  <option key={i} value={ele.value}>{ele.name}</option>
                ))}
            </select>
          </div>
          
        </div>
        <div className='d-flex flex-column gap-1'>
          <label>Password</label>
          <div className='inputField'>
            <input type='password' placeholder='Enter Password' name='password' onChange={handleChange}/>
          </div>
          {/* <span>{errors.password}</span> */}
        </div>

        <div className='mt-2'>
          <Button 
            text='Submit'
            variant='primaryBtn'
            fontSize='13px'
          />
        </div>
        
      </form>
      <div className='mt-1 text-danger'>
        {/* <span>{checkError}</span> */}
      </div>
    </div>
  )
}

export default AddNewUser