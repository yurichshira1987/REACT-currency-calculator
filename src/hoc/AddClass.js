import React from 'react'

export const AddClass=(Component,className)=>{
    return ()=>{
        return(
            <div className={className}>
            <Component/>
            </div> 
        )
       
    }
}