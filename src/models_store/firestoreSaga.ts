import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { eventChannel } from 'redux-saga';
import { call, cancel, cancelled, fork, put, take } from 'redux-saga/effects';
import { Event } from '../models/model.event';
import { Feedback } from '../models/model.feedback';
import { Prayer } from '../models/model.prayer';
import { Notification } from '../models/model.notification';
import { Location } from '../models/model.location';
import { db } from '../_firebase/firebase';
import { updateEvents, updateFeedbacks, updateLocations, updateNotifications, updatePrayers } from './firestoreSlice';
import { sagaTypes } from './_saga';

/* ---------------------------- NOTE INIT STREAMS --------------------------- */
const getStreamEvents = function () {
  const q = query(collection(db, 'events'), orderBy('timestampCreated', 'desc'));

  return eventChannel((emit) => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const x = querySnapshot.docs.map((doc) => {
        return Event.fromJson({
          ...doc.data(),
          id: doc.id,
          timestampCreated: doc.data()!.timestampCreated?.toDate(),
          timestampUpdated: doc.data()!.timestampUpdated?.toDate(),
          eventDateTime: doc.data()!.eventDateTime?.toDate()
        });
      });
      emit({ x });
    });
    return unsubscribe;
  });
};

const getStreamPrayers = function () {
  const q = query(collection(db, 'prayers'), orderBy('timestampCreated', 'desc'));

  return eventChannel((emit) => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const x = querySnapshot.docs.map((doc) => {
        return Prayer.fromJson({
          ...doc.data(),
          id: doc.id,
          timestampCreated: doc.data()!.timestampCreated?.toDate(),
          timestampUpdated: doc.data()!.timestampUpdated?.toDate()
        });
      });
      emit({ x });
    });
    return unsubscribe;
  });
};

const getStreamLocations = function () {
  const q = query(collection(db, 'locations'), orderBy('timestampCreated', 'desc'));

  return eventChannel((emit) => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const x = querySnapshot.docs.map((doc) => {
        return Location.fromJson({
          ...doc.data(),
          id: doc.id,
          timestampCreated: doc.data()!.timestampCreated?.toDate(),
          timestampUpdated: doc.data()!.timestampUpdated?.toDate()
        });
      });
      emit({ x });
    });
    return unsubscribe;
  });
};

const getStreamFeedbacks = function () {
  const q = query(collection(db, 'feedbacks'), orderBy('timestampCreated', 'desc'));

  return eventChannel((emit) => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const x = querySnapshot.docs.map((doc) => {
        return Feedback.fromJson({
          ...doc.data(),
          id: doc.id,
          timestampCreated: doc.data()!.timestampCreated?.toDate(),
          timestampUpdated: doc.data()!.timestampUpdated?.toDate()
        });
      });
      emit({ x });
    });
    return unsubscribe;
  });
};

const getStreamNotifications = function () {
  const q = query(collection(db, 'notifications'), orderBy('timestampCreated', 'desc'));

  return eventChannel((emit) => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const x = querySnapshot.docs.map((doc) => {
        return Notification.fromJson({
          ...doc.data(),
          id: doc.id,
          timestampCreated: doc.data()!.timestampCreated?.toDate(),
          timestampUpdated: doc.data()!.timestampUpdated?.toDate()
        });
      });
      emit({ x });
    });
    return unsubscribe;
  });
};

/* -------------------------- NOTE CONSUME STREAMS -------------------------- */
export function* srteamLocations(): any {
  const channel = yield call(getStreamLocations);
  try {
    while (true) {
      const { x } = yield take(channel);
      yield put(updateLocations(x));
    }
  } finally {
    if (yield cancelled()) {
      yield put(updateLocations([]));
      channel.close();
    }
  }
}

export function* streamPrayers(): any {
  const channel = yield call(getStreamPrayers);
  try {
    while (true) {
      const { x } = yield take(channel);
      yield put(updatePrayers(x));
    }
  } finally {
    if (yield cancelled()) {
      yield put(updatePrayers([]));
      channel.close();
    }
  }
}

export function* streamEvents(): any {
  const channel = yield call(getStreamEvents);
  try {
    while (true) {
      const { x } = yield take(channel);
      yield put(updateEvents(x));
    }
  } finally {
    if (yield cancelled()) {
      yield put(updateEvents([]));
      channel.close();
    }
  }
}

export function* streamNotifications(): any {
  const channel = yield call(getStreamNotifications);
  try {
    while (true) {
      const { x } = yield take(channel);
      yield put(updateNotifications(x));
    }
  } finally {
    if (yield cancelled()) {
      yield put(updateNotifications([]));
      channel.close();
    }
  }
}

export function* streamFeedbacks(): any {
  const channel = yield call(getStreamFeedbacks);
  try {
    while (true) {
      const { x } = yield take(channel);
      yield put(updateFeedbacks(x));
    }
  } finally {
    if (yield cancelled()) {
      yield put(updateFeedbacks([]));
      channel.close();
    }
  }
}

/* ----------------------- NOTE EXPORT STARTED STREAMS ---------------------- */
function* rootStreamEvents(): any {
  while (yield take(sagaTypes.STREAM_EVENTS)) {
    const t = yield fork(streamEvents);
    yield take(sagaTypes.STREAM_EVENTS_CANCEL);
    yield cancel(t);
  }
}

function* rootStreamPrayers(): any {
  while (yield take(sagaTypes.STREAM_PRAYERS)) {
    const t = yield fork(streamPrayers);
    yield take(sagaTypes.STREAM_PRAYERS_CANCEL);
    yield cancel(t);
  }
}

function* rootStreamLocations(): any {
  while (yield take(sagaTypes.STREAM_LOCATIONS)) {
    const t = yield fork(srteamLocations);
    yield take(sagaTypes.STREAM_LOCATIONS_CANCEL);
    yield cancel(t);
  }
}

function* rootStreamNotification(): any {
  while (yield take(sagaTypes.STREAM_NOTIFICATIONS)) {
    const t = yield fork(streamNotifications);
    yield take(sagaTypes.STREAM_NOTIFICATIONS_CANCEL);
    yield cancel(t);
  }
}

function* rootStreamFeedbacks(): any {
  while (yield take(sagaTypes.STREAM_FEEDBACKS)) {
    const t = yield fork(streamFeedbacks);
    yield take(sagaTypes.STREAM_FEEDBACKS_CANCEL);
    yield cancel(t);
  }
}

export { rootStreamEvents, rootStreamPrayers, rootStreamLocations, rootStreamNotification, rootStreamFeedbacks };
