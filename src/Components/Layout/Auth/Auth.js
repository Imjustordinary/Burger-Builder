import React, { Component } from 'react';
import Input from '../ContactData/Input/Input'
import Button from '../Button/Button'
import SideDrawer from '../SideDrawer/SideDrawer'
import Toolbar from '../Toolbar/Toolbar'
import classes from './Author.module.css';
import * as Action from '../../../Store/Action'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Modal from '../UI/Modal'

class Auth extends Component {
    state = { 
        isSignedUp: false,
        formValid:false,
        sideDraw:false,
        loginForm:{              
            email:{isBlured: false,
            elementType :'input',
            elementconfig:{type:'text', placeholder:'Your mail', value:''
            },
            
          
          validation:{
            required:true,
            touched:false,
            valid:false,
            isEmail:true
          }},
          password:{
            elementType :'input',
            elementconfig:{type:'password', placeholder:'Your password', value:'',autoComplete:'off'
          },
          isBlured: false,
          
          validation:{
            required:true,
            touched:false,
            valid:false,
            minLength:true
          }}
     }}

     changeValueHandler=(event,identifier)=>{
      
        const newOrderForm = {...this.state.loginForm}
        const newInput = {...this.state.loginForm[identifier]}

        if(this.state.loginForm[identifier].isBlured){
          if(!newInput.validation.noNeedto){
            newInput.validation.valid=this.validationgHandler(event.target.value,this.state.loginForm[identifier].validation)
            
          if(!newInput.validation.touched){
            newInput.validation.touched = !newInput.validation.touched
          }
        }
          let formValid = true
          for(let i in newOrderForm){
            formValid = newOrderForm[i].validation.valid && formValid
          }
          this.setState({ formValid: formValid})
  
        }

        newInput.elementconfig.value = event.target.value
        newOrderForm[identifier] = newInput
        this.setState({loginForm:newOrderForm})
  
      }

      onBlurHanlder=(event,identifier)=>{
        
        const newOrderForm = {...this.state.loginForm}
        const newInput = {...this.state.loginForm[identifier]}
        newInput.isBlured = true
        newOrderForm[identifier] = newInput
        if(!newInput.validation.noNeedto){
          newInput.validation.valid=this.validationgHandler(event.target.value,this.state.loginForm[identifier].validation)
          
        if(!newInput.validation.touched){
          newInput.validation.touched = !newInput.validation.touched
        }
      }
        let formValid = true
        for(let i in newOrderForm){
          formValid = newOrderForm[i].validation.valid && formValid
        }
        this.setState({loginForm:newOrderForm, formValid: formValid})
      }
  
  
      submitHandler=(event)=>{
        event.preventDefault()
        this.props.signUp(this.state.loginForm.email.elementconfig.value,this.state.loginForm.password.elementconfig.value,this.state.isSignedUp)
        
      }

      validationgHandler=(value,rules)=>{
          let isValid = true
          if(rules.required){
            isValid = value.trim() !== '' && isValid
          }
          if(rules.minLength){
            isValid= value.length > 5 && isValid
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
      sideDrawOpenHandler = () => {
        this.setState({ sideDraw: true });
      };
    
      sideDrawCloseHandler = () => {
        this.setState({ sideDraw: false });
      };

      signChangeHandler =()=>{
        this.setState(prev=>{return{isSignedUp: !prev.isSignedUp}})
      }
  
    render() { 
      let pathName = '/'
        if(this.props.building && this.props.path !== '/'){
          pathName = this.props.path
        }
        const form = []
        for (let i in this.state.loginForm){
            form.push({...this.state.loginForm[i], identifier:i})
        }
        const inputs = form.map(each=>              
            <Input elementType={each.elementType} identifier={each.identifier} 
            elementconfig={each.elementconfig} 
            key={each.identifier} 
            changeValue={this.changeValueHandler} 
            onblur ={this.onBlurHanlder}
            valid={each.validation.valid} touched={each.validation.touched}/>
                                )
        

            
        return ( 
          
        <div>
          {this.props.token?<Redirect to={pathName} />:null}

      <Modal 
      show={this.props.error}
      onCancel={this.props.errorFree}
      idenClass = 'MoAuth'
      >
          {this.props.error?this.props.error:null}
      </Modal>
            <SideDrawer
      onClose={this.sideDrawCloseHandler}
      sideDraw={this.state.sideDraw}
      />
      <Toolbar onOpen={this.sideDrawOpenHandler} />
      <div className={classes.Layout}>
      <div className={classes.Author}>
        <form onSubmit={this.submitHandler}>
            
                {inputs}
                
            <Button btnType='Success'>Register</Button>
            
            </form>
            <Button btnType='Danger'  onCancel={this.signChangeHandler}>{this.state.isSignedUp?'Switch to Sign up':'Switch to Sign in'}</Button>
            </div>
            </div>
            </div>
         );
    }
}

const mapStatetoProps =(state)=>{
  return{
    error: state.Auth.error,
    loading:state.Auth.loading,
    token:state.Auth.token != null,
    path:state.BurgerReducer.path,
    building:state.BurgerReducer.building
  }
}

const mapDispatchtoProps =(dispatch)=>{
  return{
    signUp : (email, password,isSignedUp)=>dispatch(Action.signUp(email,password,isSignedUp)),
    errorFree: ()=>dispatch(Action.errorFree())
  }
} 
export default connect(mapStatetoProps,mapDispatchtoProps)(Auth);