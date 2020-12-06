import React from 'react'
import './calc.scss'
import { Counter } from '../../components/counter/Counter'
import { CountResult } from '../../components/countResult/CountResult'

export const Calc=()=>{
    return(
        <div className='calc'>
            <div className='calcContainer'>
                <Counter/>
                <CountResult/>
            </div>
        </div>
    )
}