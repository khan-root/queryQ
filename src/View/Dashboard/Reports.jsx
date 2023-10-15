import './dashboard.scss'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { useState } from 'react';
import Select from 'react-select'
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
  


const options = {
  plugins: {
    legend: {
      position: 'top',
      labels: {
        pointStyle: 'circle',  // set the shape to circle
        boxWidth: 10, // width of the colored box next to the label
        padding: 20,  // adjust the padding around the label text
      }
    }
  
   
  }
};


const Reports = (props) => {

  const { reportsData } = props
  const labels = reportsData.labels
  const openCount = reportsData.openCount
  const closeCount = reportsData.closeCount


  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');

  const years = Array.from({ length: 12 }, (_, i) => 2012 + i);
  const months = [
    { value: 1, label: 'Jan' },
    { value: 2, label: 'Feb' },
    { value: 3, label: 'Mar' },
    { value: 4, label: 'Apr' },
    { value: 5, label: 'May' },
    { value: 6, label: 'Jun' },
    { value: 7, label: 'Jul' },
    { value: 8, label: 'Aug' },
    { value: 9, label: 'Sep' },
    { value: 10, label: 'Oct' },
    { value: 11, label: 'Nov' },
    { value: 12, label: 'Dec' }
  ];
  const weeks = [
    { value: 1, label: '1 week' },
    { value: 2, label: '2 weeks' },
    { value: 3, label: '3 weeks' },
    { value: 4, label: '4 weeks' }
  ];

  const data = {
    labels,
  datasets: [
    {
      label: "Total Open Queries",
      data: openCount,
      backgroundColor: "rgb(50, 190, 202)",
      borderColor: 'transparent',
      fill: false,
      borderWidth: 2, // set borderWidth to 0 to remove lines
      pointRadius: 4, // set pointRadius to show dots
      pointStyle: 'dash'
    },
    {
      label: "Total Closed Queries",
      data: closeCount,
      backgroundColor: "rgb(146, 212, 210)",
      borderColor: 'transparent',
      fill: false,
      borderWidth: 2, // set borderWidth to 0 to remove lines
      pointRadius: 4, // set pointRadius to show dots
      pointStyle: 'dash'
    
    }
  ]
};
  
  return (
  
    <div className='reportsMain'>
      <div className='reportsHeader'>
        <span className='reportsTitle'>Weekly Report</span>
        <div className='selectReportDate'>
          <form className='reportForm'>
            <Select
              options={months}
              value={selectedMonth}
              onChange={option => setSelectedMonth(option)}
              placeholder="Month"
              components={{ IndicatorSeparator: null}}
              styles={{
                    control: base => ({
                        ...base,
                        fontSize: 14,
                        // padding: '0 2px',
                        boxShadow: 'none',
                        outline: 'none',
                        border: '1px solid #B3B3B3',
                        borderRadius: '5px',
                        color: '#495057'
                    }),
                    placeholder: base => ({
                        ...base,
                        color: 'black',
                    }),
                    input: base => ({
                        ...base,
                        padding: 0,
                        margin: 0,
                    }),
                }}
            />

            <Select
              options={years.map(year => ({ value: year, label: year.toString() }))}
              value={selectedYear}
              onChange={option => setSelectedYear(option)}
              placeholder="Year"
              components={{ IndicatorSeparator: null}}
              styles={{
                    control: base => ({
                        ...base,
                        fontSize: 14,
                        // padding: '0 2px',
                        boxShadow: 'none',
                        outline: 'none',
                        border: '1px solid #B3B3B3',
                        borderRadius: '5px',
                        color: '#495057'
                    }),
                    placeholder: base => ({
                        ...base,
                        color: 'black',
                    }),
                    input: base => ({
                        ...base,
                        padding: 0,
                        margin: 0,
                    }),
                }}
            />


            <Select
              options={weeks}
              value={selectedWeek}
              onChange={option => setSelectedWeek(option)}
              placeholder="Week"
              components={{ IndicatorSeparator: null}}
              styles={{
                    control: base => ({
                        ...base,
                        fontSize: 14,
                        // padding: '0 2px',
                        boxShadow: 'none',
                        outline: 'none',
                        border: '1px solid #B3B3B3',
                        borderRadius: '5px',
                        color: '#495057'
                    }),
                    placeholder: base => ({
                        ...base,
                        color: 'black',
                    }),
                    input: base => ({
                        ...base,
                        padding: 0,
                        margin: 0,
                    }),
                }}
            />
          </form>
        </div>
      </div>
      <hr />
        <Bar data={data}  options={options} />
    </div>
  )
}

export default Reports