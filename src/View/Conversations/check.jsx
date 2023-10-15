
//   const options = [
//   { value: "apple", label: "Apple" },
//   { value: "banana", label: "Banana" },
//   { value: "cherry", label: "Cherry" },
//   { value: "grape", label: "Grape" },
//   { value: "kiwi", label: "Kiwi" },
//   { value: "orange", label: "Orange" },
//   { value: "peach", label: "Peach" },
//   { value: "pear", label: "Pear" },
//   { value: "pineapple", label: "Pineapple" },
// ];
  // const [selectedOption, setSelectedOption] = useState(null);
  // const [menuIsOpen, setMenuIsOpen] = useState(false);
  // const [selectedValue, setSelctedValue] = useState('');
  // const [showChannel, setShowChannel] = useState(false);
  // const [showLabel, setShowLabel] = useState(false);

  // function handleChange(selectedOption) {
  //   setSelectedOption(selectedOption);
  //   if(selectedOption){
  //     setSelctedValue(selectedOption.value)
  //   }
  // }
  // function handleInputChange(inputValue) {
  //   if (inputValue) {
  //     setMenuIsOpen(true);
  //   } else {
  //     setMenuIsOpen(false);
  //   }
  // }
  // const DropdownIndicator = props => (
  //   <components.DropdownIndicator {...props}>
  //     <span className="icon-search" />
  //     <span>Search</span>
  //   </components.DropdownIndicator>
  // );
            <Select
              options={options}
              components={{ IndicatorSeparator: null }}
              placeholder="Select Fruit"
              value={selectedOption}
              onChange={handleChange}
              isSearchable
              onInputChange={handleInputChange}
              menuIsOpen={menuIsOpen}
              styles={{
                dropdownIndicator: base => ({ display: 'none' }),
                control: base => ({
                  ...base,
                  border: '1px solid black',
                  borderRadius: '5px',
                  height: 40,
                  fontSize: 16,
                  padding: '0 8px',
                  boxShadow: 'none',
                  outline: 'none'
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
