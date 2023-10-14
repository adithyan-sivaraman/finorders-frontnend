/* eslint-disable react/prop-types */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OrderCountChart = ({ data, option }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const optionSelected = {
    "1": "Current Month",
    "2": "Last Month",
    "3": "Last 3 Months",
    "4": "Last 6 Months",
    "5": "Last 1 Year",
  }
  let filterData = [];
  let labels = [];
  const countDate = {}
  
  if (option === "1" || option === "2") {
    const date = new Date();
    const month = option === "1" ? date.getMonth() + 1 : date.getMonth();
    const year = date.getFullYear();
    const noOfDays = new Date(year, month, 0).getDate();
    filterData = data.map((item) => item.orderDt).filter(item => new Date(item).getMonth() + 1 === month)

    labels = Array.from({ length: noOfDays }, (a, i) => i + 1)
    labels.forEach(day => {
      countDate[day] = 0;
    })

    filterData.forEach(date => {
      const createdDt = new Date(date).getDate();

      if (countDate[createdDt]) {
        countDate[createdDt]++;
      }
      else {
        countDate[createdDt] = 1;
      }
    });

  }

  if (option === "3") {
    const date = new Date();
    const month = date.getMonth();
    labels.push( month - 2, month - 1,month)
    countDate[`${month-2}`] = 0;
    countDate[`${month-1}`] = 0;
    countDate[`${month}`] = 0;
    filterData = data.map((item)=>item.orderDt).filter((item)=>{
      
      const orderDate = new Date(item);
      const orderMonth = orderDate.getMonth()+1
    
    
      if(labels.includes(Number(orderMonth))){ 
          countDate[orderMonth] ++;
      }
    
    })
    
  }
  const length = filterData.length;
  const options = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: 'black',
          font: {
            size: 14,
            weight: 'bold',
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          color: 'black',
          font: {
            size: 14,
            weight: 'bold',
          },
          grid: {
            display: false
          }
        }
      }
    },
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "blue",
        bodyColor: "white",
        titleFont: {
          size: 15
        },
        bodyFont: {
          size: 15
        },
        padding: 5,
        titleColor: 'yellow'
      },
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 15,
            weight: 'bold',
          },
          color: 'black',
        }
      },
      title: {
        display: true,
        text: `Orders Created in ${optionSelected[option]} `,
        color: 'black',
        font: {
          size: 16
        }
      },
    },

  };
  
  const orderData = {
    labels: Number(option)<=2?labels.map(item => `${item}`):labels.map((index) => `${months[index-1]}`),
    datasets: [
      {
        label: length !== 0 ? 'No of Orders Created' : 'No Orders Created',
        data: Object.values(countDate) || [],
        backgroundColor: '#0096FF' ,
      },
    ],
  };
  return <Bar
    data={orderData}
    options={options}
  />;
};
export default OrderCountChart;
