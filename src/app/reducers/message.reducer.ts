import { createReducer, on } from '@ngrx/store';
import { loadCreatedMessage, loadCreateFail, loadMessagesFailure, loadMessagesSuccess } from '../feature/state/message.actions';
import { MESSAGE_STATE_NAME } from '../feature/state/message.selectors';
import { sharedReducer, SharedState } from '../shared/state/shared.reducer';
import { SHARED_STATE_NAME } from '../shared/state/shared.selectors';

export const messageFeatureKey = 'message';

export interface State {
  messages: any[];
}

export const initialState: State = {
  messages: [],
};

export const reducer = createReducer(
  initialState,
  on(loadMessagesSuccess, (state, action) => {
    let message = [...action.message];
    return {
      ...state,
      messages: message,
    };
  }),
  on(loadMessagesFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(loadCreatedMessage, (state, action)=>{
    return {
      ...state,
      message : action.message
    }
  }),
  on(loadCreateFail, (state, action)=>{
    return {
      ...state,
      error : action.error
    }
  })
);
export interface AppState {
  [MESSAGE_STATE_NAME]: State,
  [SHARED_STATE_NAME]: SharedState
}
export const appReducer = {
  [MESSAGE_STATE_NAME]: reducer,
  [SHARED_STATE_NAME]: sharedReducer
};
