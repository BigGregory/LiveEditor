import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { createStore, applyMiddleware, Store, AnyAction } from 'redux';
import thunk, { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import { persistMiddleware } from './middlewares/persist-middleware';

import rootReducer from './reducers';

export const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(persistMiddleware, thunk))
);

/* Types */
export type AppDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;
