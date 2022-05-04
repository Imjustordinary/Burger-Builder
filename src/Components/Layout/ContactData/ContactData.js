import React, { Component } from 'react';
import Button from '../Button/Button'
import classes from './ContactData.module.css'
import Input from './Input/Input'
import axios from '../axios-order'
import Loading from '../UI/Spinner'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class ContactData extends Component {
  
    state = { orderForm:{name:{
                    elementType :'input',
                    elementconfig:{type:'text', placeholder:'Your name', value:''}
                  ,
                  validation:{
                    required:true,
                    touched:false,
                    valid:false
                  }},
              deliveryMethod:{
                elementType :'select',
                elementconfig:{option:
                  [{value:'fastest', name:'Fastest'},
                {value:'cheapest', name:'Cheapest'}],
                value:'fastest'
                              }
              ,
              validation:{
                noNeedto:true,
                valid:true
              }},
              address:{
                elementType :'input',
                elementconfig:{type:'text', placeholder:'Your address', value:''}
              ,
              validation:{
                required:true,
                touched:false,
                valid:false
              }} },
              formValid:false,
              displaySpinner:false
          }

    changeValueHandler=(event,identifier)=>{
      
      const newOrderForm = {...this.state.orderForm}
      const newInput = {...this.state.orderForm[identifier]}
      if(!newInput.validation.noNeedto){
        newInput.validation.valid=this.validationgHandler(event.target.value,this.state.orderForm[identifier].validation)
        
      if(!newInput.validation.touched){
        newInput.validation.touched = !newInput.validation.touched
      }
    }
      let formValid = true
      for(let i in newOrderForm){
        formValid = newOrderForm[i].validation.valid && formValid
      }
      newInput.elementconfig.value = event.target.value
      newOrderForm[identifier] = newInput
      this.setState({orderForm:newOrderForm, formValid: formValid})

    }


    validationgHandler=(value,rules)=>{
        let isValid = true
        if(rules.required){
          isValid = value.trim() !== '' && isValid
        }
        if(rules.minLength){
          isValid= value.length > 7 && isValid
        }
        if (rules.isEmail) {
          const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
          isValid = pattern.test(value) && isValid
      }

      if (rules.isNumeric) {
          const pattern = /^\d+$/;
          isValid = pattern.test(value) && isValid
      }

        return isValid
      
    }

    orderHandler=(event)=>{
      event.preventDefault();
            this.setState({displaySpinner: true});
    const customer ={}
      for(let i in this.state.orderForm){
        customer[i] = this.state.orderForm[i].elementconfig.value
      }
    const order = {
      ingredients : this.props.ign,
      price: this.props.totalPrice,
      customer:customer,
      userId:this.props.userId
    }
    axios.post('/Order.json?auth='+this.props.token,order).then(
      response=>{
      this.setState({displaySpinner:false});
        this.props.history.replace('/');
    }
    ).catch(error=>this.props.history.push('/'))
      
    }
    render() { 
        let body = this.props.ign?<Loading/>:<Redirect path="/"/>
        if(!this.state.displaySpinner){
          
            let orderForm=[]
            for (let i in this.state.orderForm){
              orderForm.push({...this.state.orderForm[i], identifier:i})
            }
          
            const inputs = orderForm.map(each=>
              <Input elementType={each.elementType} identifier={each.identifier} 
              elementconfig={each.elementconfig} key={each.identifier} changeValue={this.changeValueHandler} 
              valid={each.validation.valid} touched={each.validation.touched}/>
              )
          
          
            body=            
            <div>
              <form onSubmit={this.orderHandler}>
            <h4>Enter your contact data</h4>
            {inputs}
            
            <Button btnType='Success' disable={!this.state.formValid} >Register</Button>
            </form>
            </div>
          
        }
        return (     
        <div className={classes.Contact}>
            {body}
        </div>
     );
    }
}

const mapStatetoProps =state=>{
  return{
    ign:state.BurgerReducer.ingredients,
    totalPrice:state.BurgerReducer.totalPrice,
    userId:state.Auth.userid,
    token:state.Auth.token
  }
}

export default connect(mapStatetoProps)(ContactData)