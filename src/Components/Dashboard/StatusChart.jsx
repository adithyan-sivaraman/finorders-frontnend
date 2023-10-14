/* eslint-disable react/prop-types */
import {Doughnut} from 'react-chartjs-2'

import {Chart as ChartJS,ArcElement,Tooltip,Legend} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusChart = ({data})=>{
    let pendingCount = 0;
    let overDueCount= 0;
    let completeBeforeCount = 0;
    let completeAfterCount = 0;
    
    data.map((item)=>{
        if(item.status==="Completed"){
            const endDate = new Date(item.endDt);
            const completeDt = new Date(item.completeDt);
            if(completeDt<=endDate){
                completeBeforeCount++
            }
            else {
                completeAfterCount++;
            }
            
        }
        else{
            const curDt = new Date();
            const endDate = new Date(item.endDt);
            if(endDate<curDt){
                pendingCount++
            }
            else {
                overDueCount++;
            }
        }
    })
    // const totalCount = pendingCount+overDueCount+completeBeforeCount;
    const options = {

        responsive: true,
        plugins: {
            tooltip: {
                enabled: true,
                backgroundColor: "rgb(107,14,151)",
                bodyColor: "white",
                titleFont: {
                    size: 16
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
                        size: 14,
                        weight: 'bold',
                    },
                    color: 'black',
                }
            },
            title: {
                display: true,
                text: `Chart of Order Status`,
                color: 'black',
                font: {
                    size: 18
                }
            },
        },

    };

    const chartData = {
        labels: ['Completed on Time','Completed after Due Date','Pending','OverDue'],
        datasets: [
            {
                label: 'Count',
                data: [completeBeforeCount,completeAfterCount,pendingCount,overDueCount] || [],
                backgroundColor: [
                    '#0096FF',
                    '#FCF55F',
                    '#B2BEB5',
                    '#EE4B2B',
                  ],
              
                  
            },
        ],
    };

    return <Doughnut
    data={chartData}
    options={options}
/>;
    
};

export default StatusChart;
