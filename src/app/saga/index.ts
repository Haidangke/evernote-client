import { all } from 'redux-saga/effects';
import noteSaga from './noteSaga';

function* rootSaga() {
    console.log('bat dau fetch');
    yield all([noteSaga()]);
    console.log('ket thuc fetch');
}

export default rootSaga;
