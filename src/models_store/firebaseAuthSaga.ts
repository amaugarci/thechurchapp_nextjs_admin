import { eventChannel } from 'redux-saga';
import { call, cancel, cancelled, fork, put, take } from 'redux-saga/effects';
import { auth } from '../_firebase/firebase';
import { updateAuthState } from './firebaseAuthSlice';
import { sagaTypes } from './_saga';

const getAuthChannel = function () {
  return eventChannel((emit) => {
    const unsubscribe = auth.onAuthStateChanged((user) => emit({ user }));
    return unsubscribe;
  });
};

export function* streamAuthStateChange(): any {
  const channel = yield call(getAuthChannel);

  try {
    while (true) {
      const { user } = yield take(channel);
      yield put(updateAuthState(user));
    }
  } finally {
    if (yield cancelled()) {
      yield put(updateAuthState(null));
      channel.close();
    }
  }
}

function* rootAuthSaga(): any {
  while (yield take(sagaTypes.STREAM_AUTH_STATECHANGE)) {
    const t = yield fork(streamAuthStateChange);
    yield take(sagaTypes.STREAM_AUTH_STATECHANGE_CANCEL);
    yield cancel(t);
  }
}

export { rootAuthSaga };
