import React,{Fragment,useContext} from 'react'
import './login.scss'
import { Button } from '../button/Button'
import { RateContext } from '../../context/RateContext'

export const Login=()=>{
    const {renderInput,state,loginHandler}=useContext(RateContext)

    return(
        <Fragment>
            <div className='modalForm'>
            {renderInput()}
            </div>
            <div className='modalBtn'>
                <Button text='Войти' disabled={!state.isFormValid} click={loginHandler} />
            </div>
        </Fragment>
    )
}