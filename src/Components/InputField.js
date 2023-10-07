import React, { createRef, useRef } from "react";
import { useState } from "react";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";


const InputField =forwardRef((props, ref) => {
    const [value,setValue] = useState("")
    const [error, setError]= useState("")
    
    const handleChange = (event)=>{
        setValue(event.target.value)
        setError("")
        props.onChange(event.target.name,event.target.value)
    }
    
    const validate = () => {
        if(props.validation){
            const rules = props.validation.split("|")

            for(let i =0 ; i<rules.length;i++){
                const current = rules[i]

                if(current==="required"){
                    if(!value){
                        setError("this field is required")
                        return false
                    }
                }

                const pair = current.split(":")
                switch(pair[0]){
                    case "min":
                        if(value.length<pair[1]){
                            setError(`must be at least ${pair[1]}`)
                            return false
                        }
                        break;
                    case "max":
                        if(value.length>pair[1]){
                            setError(`must be more than ${pair[1]}`)
                            return false
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        return true
    }

    useImperativeHandle(ref,()=>{
        return{
            validate:() => validate()
        }
    })





    return(
        <div className="input-wrapper">
            {props.lable &&(
                <label>{props.lable}</label>
            )}
            <input 
                placeholder={props.placeholder}
                onChange={(event)=>handleChange(event)}
                type={props.type}
                value={props.value ? props.value : value}
                autoComplete={props.autoComplete}
            />
            {error&&(
                <p className="error">{error}</p>
            )}
        </div>
    )
} )
export default InputField
InputField.defaultProps = {
    placeholder:"",
    name:"",
    type:"text",
    value:"",
    autoComplete:"off",
    validation:''
}