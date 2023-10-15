import React from 'react'

import Select from 'react-select'

const SelectCompo = (props) => {
    const {options, selectOption, placeholder, value} = props 
  return (
    <div>
        <Select
            options={options}
            onChange={(selectedOption) => selectOption(selectedOption, 'countryCode')}
            value={value}
            placeholder={placeholder}
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
  )
}

export default SelectCompo