import axios from '../Components/Layout/axios-order'
import axois from 'axios'

const initialState =(ingredients,type)=>{
    return{
        type:type,
        ingredients :ingredients
        
    }
}

export const setPath =(path)=>{
    return{
        type:'SET_PATH',
        path:path
    }
}

const fetchError =()=>{
    return {
        type:'ERROR'
    }
}



const setOrder = (OrderData)=>{
    return{
        type:'SET_ORDER',
        orders:OrderData
    }
}

export const setLoading=()=>{
    return{
        type:'SET_LOADING'
    }
}

export const connect =(type)=>{
    return dispatch=>{
        axios.get('ingredients.json').then(res=> dispatch(initialState(res.data,type))).catch(error=>dispatch(fetchError()))
        
    }
}

const startSign =()=>{
    return{
        type:'START_SIGN'
    }
}


const signSuccess =(idToken, localId)=>{
    return{
        type:'SIGN_SUCCESS',
        token: idToken,
        userid: localId
    }
}

const signFailed =(error)=>{
    return{
        type:'SIGN_ERROR',
        error:error
    }
}

const expiredToken =()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("expireDate");
    localStorage.removeItem("userId");
    return{
        type:'EXPIRE_TOKEN'
    }
}

export const logOut =()=>{
    // localStorage.removeItem("token");
    // localStorage.removeItem("expireDate");
    // localStorage.removeItem("userId");
    
    return{
        type:'LOGOUT_INITIATE'
    }
}

const expiredTokenCheck = (expireTime)=>{
    return dispatch=>{
    setTimeout(()=>dispatch(expiredToken()),expireTime)
    }
}

export const errorFree =()=>{
    return{
        type:'ERROR_FREE'
    }
}

export const signUp =(email, password,isSignedUp)=>{
    return dispatch =>{
        dispatch(startSign())
        const payload = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        !isSignedUp?
        axois.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDRQ1Hh7_cssYivVtQb3b3eixfAWij6nc',payload)
        .then(res=>{
            const expireDate = new Date(new Date().getTime() + res.data.expiresIn*1000);
            localStorage.setItem("token", res.data.idToken);
            localStorage.setItem("expireDate", expireDate)
            localStorage.setItem("userId", res.data.localId);
            dispatch(expiredTokenCheck(res.data.expiresIn*1000))
        dispatch(signSuccess(res.data.idToken,res.data.localId))
        })
        .catch(error=>{
        dispatch(signFailed(error.response.data.error.message))
        })
        :
        axois.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDRQ1Hh7_cssYivVtQb3b3eixfAWij6nc',payload)
        .then(res=>{
            const expireDate = new Date(new Date().getTime() + res.data.expiresIn*1000);
            localStorage.setItem("token", res.data.idToken);
            localStorage.setItem("expireDate", expireDate)
            localStorage.setItem("userId", res.data.localId);
        dispatch(expiredTokenCheck(res.data.expiresIn*1000))
        dispatch(signSuccess(res.data.idToken,res.data.localId))
        })
        .catch(error=>{
        dispatch(signFailed(error.response.data.error.message))
        })
    }

}


export const authCheck=()=>{
    return dispatch=>{
    const token = localStorage.getItem("token");
    if(!token){
        dispatch(logOut())
            }
    else{
    const expireDate = new Date(localStorage.getItem("expireDate"))
    if(expireDate <= new Date()){
        dispatch(expiredToken())
    }
    else{
    const userId = localStorage.getItem("userId")
    dispatch(signSuccess(token, userId))
    dispatch(expiredTokenCheck( expireDate.getTime()-new Date().getTime()))
        }
    }
        }
    }

export const connectOrder =(token,userId)=>{
    return dispatch =>{
        dispatch(setLoading())
        let newOrder = []
        const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"'
        axios.get('Order.json'+queryParams).then(res=> 
          {for(let i in res.data){
            newOrder.push(
              {...res.data[i],
                id: i
              }
              )
          }
          return dispatch(setOrder(newOrder))
        }
        )
    }
}