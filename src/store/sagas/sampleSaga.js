import { takeEvery, put } from 'redux-saga/effects';
import { SAMPLE_ACTION } from 'src/store/actions';

function* sampleSagaWorker(sampleAction) {
    console.log('Running saga for: ', sampleAction);

    yield put({
        type: 'DUMMY_ACTION_FROM_SAGA',
    });
}

export function* sampleSaga() {
    yield takeEvery(SAMPLE_ACTION, sampleSagaWorker);
}
