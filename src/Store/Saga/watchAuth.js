import {takeEvery} from 'redux-saga/effects'
import {logoutSaga} from './Auth'

export function* watchAuth (){
    yield takeEvery('LOGOUT_INITIATE',logoutSaga)
}
