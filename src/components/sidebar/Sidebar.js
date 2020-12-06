import React,{useContext} from 'react'
import './sidebar.scss'
import { RateContext } from '../../context/RateContext'

export const Sidebar=()=>{
    const {state}=useContext(RateContext)

    return(
        <div className='sidebar'>
            <div className='sidebarHead'>
                <h1>Все валюты</h1>
            </div>

            <div className='sidebarContent'>
                <ul>
                    {
                        Object.keys(state.currency).map((item,i)=>{
                            return(
                                <li key={item}>
                                <p>
                                <img src={state.currency[item].flag} alt={item}/>&nbsp;{item}&nbsp;
                                {state.currency[item].name}&nbsp;
                                    </p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>     
        </div>
    )
}