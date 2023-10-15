import React, { useRef, useState } from 'react'
import Button from '../../Components/Button/Button';
import { COUNTRIES_LIST } from '../Teams/utils/data';
import { showToast } from '../../Toaster/Toaster';
import SelectCompo from '../../Components/Select/SelectCompo';
import Select from 'react-select'
import assignmenstApi from '../../Model/Data/Assignment/Assignment';

const AddFilter = (props) => {
    const {ruleId, close} = props

   

    const clearRef = useRef(null)

    const channels = [
        {id: 1, name:'Gmail', type:"gm"},
        {id: 2, name:'Whatsapp', type:'wa'},
        {id: 3, name:'Facebook', type:'fb'},
    ]
    const priorityBased = [
        {id: 1, name:'Low', pri:0},
        {id: 2, name:'Medium', pri:1},
        {id: 3, name:'High', pri:2},
    ]

    const [values, setValues] = useState({teamId:'', teamName: '', label:'', startDay: null, endDay: null, startHour: null, endHour:null, channel:null, countryCode:null, priority:null });
    const [validateSelect, setValidateSelect] = useState({
        timeBased: true,
        channelBased:false,
        priorityBased:false,
        countryBased:false,
    })

    const handleButtonClick = (key)=>{
        setValidateSelect((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
        
    }
    const options = [
        { value: null, label: 'Select Country' }, // Add the "Select Country" option at the beginning
        ...COUNTRIES_LIST.map((country) => ({
            value: `+${country.phonecode}`,
            label: `${country.country_name} (+${country.phonecode})`,
        })),
    ];
    const priorityOptions = [
        {value: null, label: 'Select Priority'},
        ...priorityBased.map((priority) => ({
            value: `${priority.pri}`,
            label: `${priority.name}`
        }))
    ];
    const channelOptions = [
        {value: null, label:'Select Channel'},
        ...channels.map((channel) => ({
            value: `${channel.type}`,
            label: `${channel.name}`
        }))
    ];


    const selectOption = (selectedOption, field)=>{
        
        setValues((prevState) => ({
            ...prevState,
            [field]: selectedOption
        }));
    }



    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


    const hoursOfDay = [
        { value: null, label: 'Select hour' }, // Add the "Select hour" option at the beginning
        ...Array.from({ length: 24 }, (_, index) => {
            const hour = index % 12 === 0 ? 12 : index % 12;
            const ampm = index < 12 ? 'am' : 'pm';
            const label = `${hour}:00${ampm}`;
            return { value: index, label };
        })
    ];

    const handleDayChange = (selectedOption, field) => {
            setValues((prevState) => ({
                ...prevState,
                [field]: selectedOption
            }));

        
    };



    const handleHourChange = (selectedOption, field) => {

        
        setValues((prevState) => ({
        ...prevState,
        [field]: selectedOption
        }));
    };

    const formValidate = ()=>{
        if (
            !validateSelect.timeBased &&
            !validateSelect.channelBased &&
            !validateSelect.countryBased &&
            !validateSelect.priorityBased
        ){
            showToast('Select any rule', 'error');
            return
        }

        if (validateSelect.timeBased) {
            if (values.startDay === null || values.startDay.value === null) {
                showToast('Select Start day of Week', 'error');
                return
            } else if (values.startDay.value === 0) {
                showToast(`Start day of week can't be Sunday`, 'error');
                return 
            } else if (values.endDay === null || values.endDay.value === null) {
                showToast('Select End day of Week', 'error');
                return
            } 
            else if (values.endDay.value === 1) {
                showToast(`End day of week can't be Monday`, 'error');
                return 
            } 
            else if (values.startHour === null || values.startHour.value === null) {
                showToast('Select Start Hour', 'error');
                return
            } else if (values.endHour === null || values.endHour.value === null) {
                showToast(`Select End Hour`, 'error');
                return 
            } 
        }
        if (validateSelect.channelBased) {
            if (values.channel === null || values.channel.value === null) {
                showToast('Select Channel', 'error');
                return
            } 
        }
        if (validateSelect.countryBased) {
            if (values.countryCode === null || values.countryCode.value === null) {
                showToast('Select Country', 'error');
                return
            } 
        }
        if (validateSelect.priorityBased) {
            if (values.priority === null || values.priority.value === null) {
                showToast('Select Priority', 'error');
                return
            } 
        }
        
        return true
    }

   const handleAddFilter = async (e) => {
    e.preventDefault();
    const objectsToSend = [];

    const validate = formValidate()

    // Check which conditions are met and add the corresponding objects to the array
    if(validate){
        if (values.startDay && values.endDay && values.startHour && values.endHour) {
            const timeBased = {
                ruleId: ruleId,
                conditionType: "TIME_BASED",
                conditionData: {
                    timeBase: {
                        startHour: values.startHour.value,
                        endHour: values.endHour.value,
                        startDow: values.startDay.value,
                        endDow: values.endDay.value
                    }
                }
            };
            objectsToSend.push(timeBased);
        }

        if (values.channel) {
            const channelBased = {
                ruleId: ruleId,
                conditionType: "CHANNEL_BASED",
                conditionData: { channel: { channel: values.channel.value } }
            };
            objectsToSend.push(channelBased);
        }

        if (values.priority) {
            const priorityBased = {
                ruleId: ruleId,
                conditionType: "PRIORITY_BASED",
                conditionData: { priority: { priority: values.priority.value } }
            };
            objectsToSend.push(priorityBased);
        }

        if (values.countryCode) {
            const countryBased = {
                ruleId: ruleId,
                conditionType: "COUNTRY_BASED",
                conditionData: { countryCode: { countryCode: values.countryCode.value } }
            };
            objectsToSend.push(countryBased);
        }


        try{
        
        
            const responses = await Promise.all(
                objectsToSend.map(async (object) => {
                    // Send the current object to the API
                    const response = await assignmenstApi.addFilterAndRules(object);
                    return response;
                })
            );
            const allSuccessful = responses.every((response) => response.status === 200 && response.data.STATUS === "SUCCESSFUL");
            if(allSuccessful){
                close()
                showToast('Condition successfully created ','success')

            }
        }catch(err){
            console.log(err)
        }
    }
};

  return (
    <div className='d-flex flex-column gap-3 filterForm' ref={clearRef}>
        <div>
            <Button 
                variant='primaryBtn'
                text='Time Based'
                fontSize='12px'
                width='125px'
                height='30px'
                padding='0'
                onClick={() => handleButtonClick('timeBased')}
                type="button"

            />
        </div>
        {validateSelect.timeBased &&
        <div className='d-flex flex-column gap-2'>
            <div>
                <label>Start Day Of Week</label>
                <Select
                    // options={daysOfWeek.map((day, index) => ({ value: index, label: day }))}
                    options={[
                        { value: null, label: 'Select Day' },
                        ...daysOfWeek.map((day, index) => ({ value: index, label: day })),
                    ]}
                    value={values.startDay}
                    onChange={(selectedOption) => handleDayChange(selectedOption, 'startDay')}
                    placeholder="Select day"
                    components={{ IndicatorSeparator: null}}
                    styles={{
                        control: base => ({
                            ...base,
                            fontSize: 14,
                            padding: '0 8px',
                            boxShadow: 'none',
                            outline: 'none',
                            border: '1px solid #B3B3B3',
                            borderRadius: '10px',
                            color: '#495057'
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
            <div>
                <label>End Day Of Week</label>
                <Select
                    // options={daysOfWeek.map((day, index) => ({ value: index, label: day }))}
                    options={[
                        { value: null, label: 'Select Day' },
                        ...daysOfWeek.map((day, index) => ({ value: index, label: day })),
                    ]}
                    value={values.endDay}
                    onChange={(selectedOption) => handleDayChange(selectedOption, 'endDay')}
                    placeholder="Select day"
                    components={{ IndicatorSeparator: null}}
                    styles={{
                        control: base => ({
                            ...base,
                            fontSize: 14,
                            padding: '0 8px',
                            boxShadow: 'none',
                            outline: 'none',
                            border: '1px solid #B3B3B3',
                            borderRadius: '10px',
                            color: '#495057'
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
            <div>
                <label>Start Time</label>
                <Select
                    options={hoursOfDay}
                    value={values.startHour}
                    onChange={(selectedOption) => handleHourChange(selectedOption, 'startHour')}
                    placeholder="Select hour"
                    components={{ IndicatorSeparator: null}}
                    styles={{
                        control: base => ({
                            ...base,
                            fontSize: 14,
                            padding: '0 8px',
                            boxShadow: 'none',
                            outline: 'none',
                            border: '1px solid #B3B3B3',
                            borderRadius: '10px',
                            color: '#495057'
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
            <div>
                <label>End Time</label>
                <Select
                    options={hoursOfDay}
                    value={values.endHour}
                    onChange={(selectedOption) => handleHourChange(selectedOption, 'endHour')}
                    placeholder="Select hour"
                    components={{ IndicatorSeparator: null}}
                    styles={{
                        control: base => ({
                            ...base,
                            fontSize: 14,
                            padding: '0 8px',
                            boxShadow: 'none',
                            outline: 'none',
                            border: '1px solid #B3B3B3',
                            borderRadius: '10px',
                            color: '#495057'
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
        </div>
        }

        <div>
            <Button 
                variant='primaryBtn'
                text='Channel Based'
                fontSize='12px'
                width='125px'
                height='30px'
                padding='0'
                onClick={() => handleButtonClick('channelBased')}
                type="button"
            />
        </div>

        {validateSelect.channelBased && 
            <div className='d-flex flex-column gap-2'>
                <label>Select Channel</label>
                <Select
                    options={channelOptions}
                    onChange={(selectedOption) => selectOption(selectedOption, 'channel')}
                    value={values.channel}
                    placeholder="Select Channel"
                    components={{ IndicatorSeparator: null}}
                    styles={{
                        control: base => ({
                            ...base,
                            fontSize: 14,
                            padding: '0 8px',
                            boxShadow: 'none',
                            outline: 'none',
                            border: '1px solid #B3B3B3',
                            borderRadius: '10px',
                            color: '#495057'
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
                {/* <select>
                    <option onChange={handleSelect} name='channel'>Select Channel</option>
                    {channels.map((ele)=>(
                        <option key={ele.id} value={ele.id}>{ele.name}</option>
                    ))}
                </select> */}
            </div>
        }
        <div>
            <Button 
                variant='primaryBtn'
                text='Priorty Based'
                fontSize='12px'
                width='125px'
                height='30px'
                padding='0'
                onClick={() => handleButtonClick('priorityBased')}
                type="button"
            />
        </div>
        {validateSelect.priorityBased && 
            <div className='d-flex flex-column gap-2'>
                <label>Select Priority</label>
                <Select
                    options={priorityOptions}
                    onChange={(selectedOption) => selectOption(selectedOption, 'priority')}
                    value = {values.priority}
                    placeholder="Select Priority"
                    components={{ IndicatorSeparator: null}}
                    styles={{
                        control: base => ({
                            ...base,
                            fontSize: 14,
                            padding: '0 8px',
                            boxShadow: 'none',
                            outline: 'none',
                            border: '1px solid #B3B3B3',
                            borderRadius: '10px',
                            color: '#495057'
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
                {/* <select>
                    <option onChange={handleSelect} name='priority'>Select Priority</option>
                    {priorityBased.map((ele)=>(
                        <option key={ele.id} value={ele.id}>{ele.name}</option>
                    ))}
                </select> */}
            </div>
        }
        <div className='d-flex flex-column gap-2'>
            <Button 
                variant='primaryBtn'
                text='Country Based'
                fontSize='12px'
                width='125px'
                height='30px'
                padding='0'
                onClick={() => handleButtonClick('countryBased')}
                type="button"

            />
            {validateSelect.countryBased && 
                <div>
                <label>Select Country</label>
                <SelectCompo 
                    options = {options}
                    selectOption = {selectOption}
                    placeholder="Select Country"
                    value = {values.countryCode}

                />
                {/* <Select
                    options={options}
                    // onChange={selectOption}
                    onChange={(selectedOption) => selectOption(selectedOption, 'countryCode')}

                    placeholder="Select Country"
                    components={{ IndicatorSeparator: null}}
                    styles={{
                        control: base => ({
                            ...base,
                            fontSize: 14,
                            padding: '0 8px',
                            boxShadow: 'none',
                            outline: 'none',
                            border: '1px solid #B3B3B3',
                            borderRadius: '10px',
                            color: '#495057'
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
                
                /> */}
            </div>
            
            }
        </div>

        <div>

            <Button 
                text='Create'
                variant='primaryBtn'
                fontSize='13px'
                padding='4px 10px'
                type='submit'
                onClick={(e)=> handleAddFilter(e)}
            />

        </div>
    </div>
  )
}

export default AddFilter