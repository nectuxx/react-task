import React, { useState, useEffect } from 'react'
import { useForm, Controller, ErrorMessage } from "react-hook-form";

import {CONSTANTS} from '../config';

import FormInput from "../components/FormInput.jsx";
import Button from "../components/Button.jsx";

import BarChart  from '../components/BarChart.jsx';

export function InsuranceCalculator(props) {

    const InitialValues = {
      income: 11000,
      expense1: 110000,
      expense2: 9000,
      expense3: 2500,
      otherExpense: 6500,
      recoveryValue: 12
    };

    const [data, setData] = useState([]); // initialize for chart data
    const [defaultValues, setDefaultValues] = useState(InitialValues); // default values to render
    const [expenseData1, setexpenseData1] = useState(0); // default values to render
    const [expenseData2, setexpenseData2] = useState(0); // default values to render
     
    function handleChange(name, value) {
      console.log(name, value);
      
      const newItem = {
        ...defaultValues,
        [name]: value
      };

      setDefaultValues(newItem)
      
    }

    useEffect(() => {

      // function to calcxulate the values for the chart
      const calChartFunc = (defaultValues) => {
        let dataSet = [];
          let finalData = [];
          const dataVal = Object.values(defaultValues).reduce((total, values, index, array) => {
            // console.log(total, values, index, array)
            // console.log(total)
            if(index === array.length-1) { 
              return total;
            }else if(index === array.length-2) { 
              return (total - values);
            }else { 
              return total + values;
            }
          }, 0);
          setexpenseData1(dataVal)

          const dataVal1 = Object.values(defaultValues).reduce((total, values, index, array) => {
            // console.log(total, values, index, array)
            // console.log(total)
            if(index === array.length-1) { 
              return (total*1.2) / values;
            }else { 
              return total + values;
            }
          }, 0);
          setexpenseData2(dataVal1)

          dataSet.push(dataVal, dataVal1)

          const arr =  {
              label: CONSTANTS.INSURANCE_PAGE.ESTM_COST,
              data: dataSet,
              backgroundColor: "#49DCFA",
              borderColor: "#49DCFA",
              borderWidth: 1
            }
          
            finalData.push(arr)
        
          setData({
            labels: [CONSTANTS.INSURANCE_PAGE.ESTM_COST,CONSTANTS.INSURANCE_PAGE.ESTM_COST],
            datasets: finalData
          })
      }


      setTimeout(() => {
        calChartFunc(defaultValues)
      }, 3000);
    

        // console.log("jj", defaultValues)
      
    },[defaultValues]);
    
      return (
        <div className="container-fluid">

            <div className="pagemain-header clearfix"> 
               <h5 className="page-title">Insurance Calculator</h5>
            </div>

            <div className = "col-md-12 row">
                <div className="col-md-6">
                  <form>
                     
                    <FormInput onChange={handleChange} label={CONSTANTS.INSURANCE_PAGE.LBL1} type={""} name={"income"} defaultValue={defaultValues} suffix={"/month"} />
                    <FormInput onChange={handleChange} label={CONSTANTS.INSURANCE_PAGE.LBL2} type={""} name={"expense1"} defaultValue={defaultValues} suffix={""} />
                    <FormInput onChange={handleChange} label={CONSTANTS.INSURANCE_PAGE.LBL3} type={""} name={"expense2"} defaultValue={defaultValues} suffix={""} />
                    <FormInput onChange={handleChange} label={CONSTANTS.INSURANCE_PAGE.LBL4} type={""} name={"expense3"}defaultValue={defaultValues} suffix={"/month"} />
                    <FormInput onChange={handleChange} label={CONSTANTS.INSURANCE_PAGE.LBL5} type={""} name={"otherExpense"} defaultValue={defaultValues} suffix={"/month"} />
                  </form>
                </div>
                <div className="col-md-6">
                    <FormInput onChange={handleChange} label={CONSTANTS.INSURANCE_PAGE.RECOVERY} type={""} prefix={"no"} name={"recoveryValue"} defaultValue={defaultValues} suffix={" months"} />
                    {data && data.datasets && data.datasets.length > 0  && <BarChart data={data} /> }
                    <p>A serious illness with recovery lasting {defaultValues.recoveryValue} months could put your finances down by ${expenseData1} today and by ${expenseData2} in 10 years.</p>
                    <Button variant="primary" size={"lg"} >Start Comparing Quotes</Button>
                </div>
            </div>
        </div>
      )
}
