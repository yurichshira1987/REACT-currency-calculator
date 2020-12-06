import React,{useContext} from 'react'
import './dark.scss'
import { RateContext } from '../../context/RateContext'

export const Dark=()=>{
const{state,hideModal}=useContext(RateContext)
let cls=['dark']
if(state.showModal){
    cls.push('showDark')
}
    return(
        <div className={cls.join(' ')} onClick={hideModal}>

        </div>
    )
}