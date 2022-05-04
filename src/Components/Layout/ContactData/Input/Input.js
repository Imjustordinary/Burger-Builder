import React from 'react';
import classes from '../ContactData.module.css'


const Input =(props)=>{
    let body=null
    let onBlurHandler =null
    let designClass = null
    if(!props.valid && props.touched){
        designClass = classes.NotValid
    }
    if(props.onblur){
        onBlurHandler = event=>props.onblur(event,props.identifier )
    }
    switch(props.elementType){
    case 'input':
        body=<input {...props.elementconfig}  className={designClass} onBlur={onBlurHandler} onChange={(event)=>props.changeValue(event,props.identifier)} />
    break;
    case 'select':
        body=<select  value={props.elementconfig.value} 
        onChange={(event)=>props.changeValue(event,props.identifier)}
        
        >
            {props.elementconfig.option.map(option=>
                <option value={option.value} key={option.value}>{option.name}</option>
                )}
        </select>
        break;
        default:
        body=null}
    return(
        <div>
            {body}
        </div>
    )
}


export default Input