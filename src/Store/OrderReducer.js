const initialState = {
    orders : [],
    loading:false
}


const Reducer =(state=initialState, action)=>{
    switch(action.type){
    case 'SET_ORDER':
        return{
        ...state,
        orders: action.orders,
        loading:false
    }
    case 'SET_LOADING':
    return{
        ...state,
        loading:true
    }
    default:
        return{
            ...state
        }
    
    }
}

export default Reducer