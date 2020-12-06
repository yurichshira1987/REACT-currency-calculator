import React,{Fragment,useContext} from 'react'
import './register.scss'
import { Button } from '../button/Button'
import { RateContext } from '../../context/RateContext'

export const Register=()=>{
    const {renderInput,state,registrHandler}=useContext(RateContext)
    return(
        <Fragment>
            <div className='modalForm'>
                {renderInput()}
            </div>
            <div className='modalBtn'>
                <Button text='Зарегистрироваться' disabled={!state.isFormValid} click={registrHandler} />               
            </div>
        </Fragment>
    )
}