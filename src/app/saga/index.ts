import { appActions } from 'app/slice/appSlice';
import { all, put } from 'redux-saga/effects';
import noteSaga, { fetchListNote } from './noteSaga';
import tagSaga, { fetchListTag } from './tagSaga';

function* rootSaga() {
    //fetch Data
    yield put(appActions.fetchData());
    yield all([fetchListNote(), fetchListTag()]);
    yield put(appActions.fetchDataComplete());

    
    yield all([noteSaga(), tagSaga()]);
}

export default rootSaga;
