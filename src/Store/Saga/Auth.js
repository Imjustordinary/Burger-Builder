import {put} from 'redux-saga/effects'

export function* logoutSaga (){
    yield localStorage.removeItem("token");
    yield localStorage.removeItem("expireDate");
    yield localStorage.removeItem("userId");
    yield put({
        type:'LOGOUT'
    })
}