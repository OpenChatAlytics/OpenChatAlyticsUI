import * as Actions from 'src/flux/actions';
import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';

function *noop(action) {
  yield put({type: Actions.NOOP_SUCCESS});
}

function *sagas() {
  yield* takeEvery(Actions.NOOP_INIT, noop);
}

export default sagas;