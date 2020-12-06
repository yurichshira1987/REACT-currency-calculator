import React,{useContext} from 'react'
import './layout.scss'
import {AddClass} from '../../hoc/AddClass'
import {Header}  from '../header/Header'
import {Fragment} from 'react'
import { Home } from '../../pages/home/Home'
import { Sidebar } from '../sidebar/Sidebar'
import {Route,Switch} from 'react-router-dom'
import { Sample } from '../../pages/sample/Sample'
import { Unfo } from '../../pages/info/Info'
import { Calc } from '../../pages/calc/Calc'
import { RateContext } from '../../context/RateContext'

const Layout=()=>{
const{state}=useContext(RateContext)
    return(    
        <Fragment>
        <Header/>

        <div className="content">
            
            <div className="routes">

            {state.auth?
                <Switch>                               
                    <Route path='/home' exact component={Home} /> 
                    <Route path='/calc' render={()=><Calc/>} />  
                    <Route path='/info' render={()=><Unfo/>} />  
                    <Route path='/sample' render={()=><Sample/>} />                               
                </Switch> 
                :<Route path='/home' render={()=><Home/>} /> 
            }            
            </div>
                <Sidebar/>
        </div>



        </Fragment>
    )
}
export default AddClass(Layout, 'layout')