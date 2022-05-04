const Ingredient_Price = {
    Salad: 0.5,
    Meat: 1.3,
    Cheese: 0.4,
    Bacon: 0.7,
  }

const initialState = {
    ingredients: null,
    totalPrice:4,
    error:false,
    building: false,
    path:'/'
}

const reducer =(state=initialState, action)=>{
    switch(action.type){
        case 'ADD':
            return{
                ...state,
                building:true,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredient] : state.ingredients[action.ingredient]+1
                },
                totalPrice: state.totalPrice+ Ingredient_Price[action.ingredient]
            }
        case 'REMOVE':
            return{
                ...state,
                building:true,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredient]:state.ingredients[action.ingredient]-1
                },
                totalPrice: state.totalPrice - Ingredient_Price[action.ingredient]
            }
        case 'SET_INGREDIENTS':
            return{
                ...state,
                ingredients: action.ingredients,
                totalPrice:4,
                error:false,
                building:false
            }
        case 'ERROR':
            return{
                ...state,
                error:true
            }
        case 'SET_PATH':
            return{
                ...state,
                path:action.path
            }
        default:
            return state
    }
}

export default reducer