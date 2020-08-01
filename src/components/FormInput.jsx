import React, {useState} from "react";
import NumberFormat from 'react-number-format';

function FormInput(props) {
//   const [inputType] = useState(props.type)
  const [inputValue] = useState(props.defaultValue)

  function handleChange(event, name){
      console.log("eve",event, name);
      console.log("eve",event.floatValue);
      let value = event.floatValue;
      if(!value ){
        value = 0;
      }
      if(props.onChange) props.onChange(name, value)
  }

  // console.log(inputValue);
  return (
    <>
            { props.label && <label className="input-label">{ props.label }<span className="info-icon"></span></label> }
            {/* <input type={inputType} value={inputValue} name="input-form" onChange={handleChange} className="inputclass"/> */}
            <NumberFormat datatype={props.type} thousandSeparator={','} decimalSeparator={'.'} prefix={props.prefix?"":'$'} defaultValue={inputValue[props.name]} onValueChange={(values) => handleChange(values, props.name)} suffix={props.suffix} className="form-control"/>
    </>
  );
}
export default FormInput;
