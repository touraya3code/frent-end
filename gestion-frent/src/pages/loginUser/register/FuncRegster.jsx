import React from 'react'
import { useState } from 'react';
import "./Register.css";
export default function FuncRegster(props) {
    const { id, onChange, errorMessage, ...inputProps } = props;
    const  [focused,setfocused] = useState(false);
    if(errorMessage == ""){
      console.log("kkk")
    }

    
    const handleFucus =(e)=>{
      setfocused(true);
    }

  return (
    <div>
      <div class="col form-group mb-3">
        <input
          class="form-control"
          {...inputProps}
          onChange={onChange}
          onBlur={handleFucus}
          onFocus={()=>inputProps.name === "ConfirmPassword" && setfocused(true)}
          focused={focused.toString()}
        />
        <small>{errorMessage}</small>
      </div>
    </div>
  );
}
