import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { rootAuthSaga } from './firebaseAuthSaga';
import { rootStreamEvents, rootStreamPrayers, rootStreamLocations, rootStreamNotification, rootStreamFeedbacks } from './firestoreSaga';
import firebaseAuthReducer from './firebaseAuthSlice';
import firestoreReducer from './firestoreSlice';
import appReducer from './appSlice';

let sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    app: appReducer,
    firebaseAuth: firebaseAuthReducer,
    firestore: firestoreReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootAuthSaga);
sagaMiddleware.run(rootStreamEvents);
sagaMiddleware.run(rootStreamPrayers);
sagaMiddleware.run(rootStreamLocations);
sagaMiddleware.run(rootStreamNotification);
sagaMiddleware.run(rootStreamFeedbacks);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
