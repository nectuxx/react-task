import React from "react";
import { Bar } from 'react-chartjs-2'

const options = {
    title: {
      display: false,
      text: ""
    },
    legend: {
      display: false
    },
    type: "bar",
    scales: {
      yAxes: [{
         ticks: {
            stepSize: 100000,
            callback: function(value) {
               var ranges = [
                  { divider: 1e6, suffix: 'M' },
                  { divider: 1e3, suffix: 'k' }
               ];
               function formatNumber(n) {
                  for (var i = 0; i < ranges.length; i++) {
                     if (n >= ranges[i].divider) {
                        return (n / ranges[i].divider).toString() + ranges[i].suffix;
                     }
                  }
                  return n;
               }
               return '$' + formatNumber(value);
            }
         }
      }],
      xAxes: [{
         // Change here
        barPercentage: 0.4
     }]
   }
  };


  const BarChart = ({ data , yaxisData}) => {

    if(yaxisData){
      options.scales.yAxes[0]['ticks'].suggestedMin = yaxisData.Min;
      options.scales.yAxes[0]['ticks'].suggestedMax = yaxisData.Max;
      options.scales.yAxes[0]['ticks'].stepSize = yaxisData.Step;
    }

    // console.log(options.scales);

    console.log(data)
    return (
      
      <div>
            {data && data.datasets && data.datasets.length > 0 && <Bar data={data} options={options}  /> }
      </div>
    );
  
  }
  export default BarChart

//}