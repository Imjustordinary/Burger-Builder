const initialState = {
    userid:null,
    token:null,
    isSignup: true,
    loading:false,
    error:null
}

const auth =(state=initialState, action)=>{
    switch(action.type){
        case 'START_SIGN':
            return{
                ...state,
                loading: true
            }
        case 'SIGN_ERROR':
            return{
                ...state,
                error: action.error
            }
        case 'SIGN_SUCCESS':
            return{
                ...state,
                loading:false,
                userid: action.userid,
                token: action.token
            }
        case 'ERROR_FREE':
            return{
                ...state,
                error:null,
                loading:false
            }
        case 'EXPIRE_TOKEN':
            return{
                ...state,
                userid:null,
                token:null
            }
        case 'LOGOUT':
            return{
                ...state,
                userid:null,
                token:null
            }
        default:
            return{
                ...state
            }
    }

}

export default auth