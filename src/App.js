import React from 'react';
import './App.scss';
import Layout from './components/layout/Layout';
import CHF from './image/CHF.png';
import CNY from './image/CNY.png';
import EUR from './image/EUR.png';
import GBR from './image/GBR.png';
import JPY from './image/JPY.png';
import RUB from './image/RUB.png';
import USD from './image/USD.png';
import { RateContext } from './context/RateContext';
import Axios from 'axios';
import { Dark } from './components/dark/Dark';
import { Modal } from './components/modal/Modal';
import { Input } from './components/input/Input';



function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class App extends React.Component{
  constructor(props){
    super(props)

    this.state={
      auth:false,
      error:'', 
      formControls:{
        email:{ value:'',
                type:'email',
                label:'Email',
                errorMassege:'Введите коректный Емайл',
                valid:false,
                touched:false,
                validation:{
                  required:true,
                  email:true
                }
              },
      password:{ value:'',
                   type:'password',
                   label:'Пароль',
                   errorMassege:'Введите коректный пароль',
                   valid:false,
                   touched:false,
                   validation:{
                      required:true,
                      minLength:6
                    } 
                }
              },

      base:'USD',
      rate:'',
      date:'',
      currency:{
        USD:{name:'Доллар США', flag:USD,course:''},
        CNY:{name:'Китайский Юань', flag:CNY,course:''},
        EUR:{name:'Евро', flag:EUR,course:''},
        GBP:{name:'Фунт Стерлингов', flag:GBR,course:''},
        JPY:{name:'Японская Йена', flag:JPY,course:''},
        RUB:{name:'Рубль', flag:RUB,course:''},
        CHF:{name:'Швейцарский франк', flag:CHF,course:''}
      },
       //calculator
       inputValue:100,
       currencyValue:'USD',
       result:null,

       sample:{base:'USD',base2:'RUB',date:'',course:''},
       sampleList:'',
       showModal:false,
       isFormValid:false
    }
  }
loginHandler=async()=>{
  const authData={
    email:this.state.formControls.email.value,
    password:this.state.formControls.password.value,
    returnSecureToken:true
  }
  try{
    const response=await Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7gbLMknXVaWK3xZsxBQXJkc_hIYVVcVM',authData)
    //console.log(response.data.idToken)  
    const formControls={...this.state.formControls}
    formControls.email.value=''
    formControls.password.value=''
    if(response){
      this.setState({auth:true,showModal:false,error:'',formControls:formControls})
    }
  }catch(e){
      this.setState({error:'Ошибка'})
    }
}
registrHandler=async ()=>{
  const authData={
    email:this.state.formControls.email.value,
    password:this.state.formControls.password.value,
    returnSecureToken:true
  }
  
    const response=await Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7gbLMknXVaWK3xZsxBQXJkc_hIYVVcVM',authData)
    //console.log(response)
    const formControls={...this.state.formControls}
    formControls.email.value=''
    formControls.password.value=''
    if(response.data.idToken){
      this.setState({auth:true,showModal:false,error:'',formControls:formControls})
    }
    else{
      this.setState({error:'Ошибка'})
    }
  
}
showModal=()=>{
  this.setState({showModal:true})
}
hideModal=()=>{
  this.setState({showModal:false})
}
validateControl=(value,validation)=>{
    if(!validation)return true

    let isValid=true
    if(validation.requred){
      isValid=value.trim() !==''  && isValid
    }
    if(validation.email){
      isValid=validateEmail(value)  && isValid 
    }
    if(validation.minLength){
      isValid=value.length >=validation.minLength  && isValid
    }
    return isValid;
}
onChangeHandler=(event,controlName)=>{
  const formControls={...this.state.formControls}
  const control={...formControls[controlName]}

  control.value=event.target.value
  control.touched=true
  control.valid=this.validateControl(control.value,control.validation)
  formControls[controlName]=control
  let isFormValid=true
  Object.keys(formControls).forEach(name=>{
    isFormValid=formControls[name].valid && isFormValid
  })

  this.setState({formControls:formControls,isFormValid:isFormValid})
} 
renderInput=()=>{
    return Object.keys(this.state.formControls).map((controlName,i)=>{
    const control=this.state.formControls[controlName];
    return(
      <Input
      key={controlName+i}
      type={control.type}
      value={control.value}
      valid={control.valid}
      label={control.label}
      touched={control.touched}
      errorMessage={control.errorMassege}
      shouldValidate={true}
      onChange={(event)=>this.onChangeHandler(event,controlName)}  
      />

    )
  })
}
dataWrite=async ()=>{
  await fetch(`https://api.exchangeratesapi.io/${this.state.sample.date}?base=${this.state.sample.base}`)
  .then((response)=>response.json()).then((response)=>{
    this.setState({sample:{...this.state.sample,course:response.rates[this.state.sample.base2]}})
    console.log(this.state.sample.course)
    })

  await Axios.post('https://rateapp-d8789.firebaseio.com/sample.json',this.state.sample)
  .then((response)=>{
    console.log(response)
  })
  await Axios.get('https://rateapp-d8789.firebaseio.com/sample.json')
    .then((response)=>{
      this.setState({sampleList:response.data})
    }) 
}
removeSample=(id)=>{
  let sampleList={...this.state.sampleList}
  delete sampleList[id]
  this.setState({sampleList:sampleList})
  Axios.delete(`https://rateapp-d8789.firebaseio.com/sample/${id}.json`)
}
baseHandler=(event)=>{
  this.setState({sample:{...this.state.sample,base:event.target.value}})
}
base2Handler=(event)=>{
  this.setState({sample:{...this.state.sample,base2:event.target.value}})
}
sampleDateHandler=(event)=>{
  this.setState({sample:{...this.state.sample,date:event.target.value}})
}
inputValueHandler=(event)=>{
    this.setState({inputValue:event.target.value, result:null})
}
currencyValueHandler=(event)=>{
    this.setState({currencyValue:event.target.value, result:null})
}
calculatorHandler=async()=>{
    let result;
     await fetch(`https://api.exchangeratesapi.io/latest?base=RUB`)
    .then((response)=>response.json()).then((response)=>{
      result=response.rates[this.state.currencyValue]*this.state.inputValue
    })
    this.setState({result:result})
    console.log(this.state.result)
}
componentDidMount=()=>{
    // fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
    // .then((response)=>response.json()).then((response)=>{
    //   //console.log(response)

    //   const rateArr=['USD','CNY','EUR','GBP','JPY','RUB','CHF']
    //   const currency={...this.state.currency}

    //   for(let i=0;i<rateArr.length;i++){
    //     currency[rateArr[i]].course=response.rates[rateArr[i]];
    //   }
    //   this.setState({
    //     rate:response.rates,
    //     date:response.date,
    //     currency:currency
    //   })

    // })
    
    // Axios.get('https://rateapp-d8789.firebaseio.com/sample.json')
    // .then((response)=>{
    //   this.setState({sampleList:response.data})
    // })
  
}





  render(){


    return(
    <RateContext.Provider value={{state:this.state,
                                  inputValueHandler:this.inputValueHandler,
                                  currencyValueHandler:this.currencyValueHandler,
                                  calculatorHandler:this.calculatorHandler,
                                  baseHandler:this.baseHandler,
                                  base2Handler:this.base2Handler,
                                  sampleDateHandler:this.sampleDateHandler,
                                  dataWrite:this.dataWrite,
                                  removeSample:this.removeSample,
                                  renderInput:this.renderInput,
                                  showModal:this.showModal,
                                  hideModal:this.hideModal,
                                  loginHandler:this.loginHandler,
                                  registrHandler:this.registrHandler
                                  }}>

        <Dark/>
        <Modal/>                       
        <Layout/>
           
    </RateContext.Provider>
      
    )   
  }
}


export default App;
