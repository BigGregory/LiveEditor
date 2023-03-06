import { Dispatch } from 'react';

import { saveCells } from '../action-creators';
import { TypedDispatch, useTypedDispatch } from '../store';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { RootState } from '../reducers';

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: ReturnType<typeof useTypedDispatch>;
  getState: () => RootState;
}) => {
  let timer: any;
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);

      if (
        [
          ActionType.MOVE_CELL,
          ActionType.INSERT_CELL_AFTER,
          ActionType.UPDATE_CELL,
          ActionType.DELETE_CELL,
        ].includes(action.type)
      ) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 250);
      }
    };
  };
};
