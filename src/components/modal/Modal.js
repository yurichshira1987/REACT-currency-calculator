import React, {Fragment,useState,useContext} from 'react'
import './modal.scss'
import { Login } from '../login/Login'
import { Register } from '../register/Register'
import { RateContext } from '../../context/RateContext'


export const Modal=()=>{
    const[value,setValue]=useState('login')
    const links=[{name:'Вход',id:'login'},{name:'Регистрация',id:'registr'}]
    const{state,hideModal}=useContext(RateContext)
    let cls=['modal']
    const windowHundler=(id)=>{
        setValue(id)
    }
    if(state.showModal){
        cls.push('modalShow')
    }
    return(
        <div className={cls.join(' ')}>
            <Fragment>
            <div className='modalHead'>
                <ul>
                    {links.map((item,i)=>{
                        return(
                            <li style={{fontWeight:value===item.id?'bold':'normal'}}  
                             key={i}
                             onClick={()=>windowHundler(item.id)}>{item.name}</li> 
                        )                       
                    })}
                </ul>
                <i  onClick={hideModal} className='fa fa-times' aria-hidden='true'></i>
            </div>
            <hr/>
            </Fragment>
                <h2>{state.error}</h2>
            {value==='registr'?<Register/>:<Login/>}           
        </div>
    )
}