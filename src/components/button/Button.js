import React from 'react'
import './button.scss'

export const Button=(props)=>{
    return(
        <button onClick={props.click?()=>props.click():undefined} disabled={props.disabled}>
            {props.text}
        </button>
    )
}