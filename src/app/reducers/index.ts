import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromMessage from './message.reducer';


export interface State {

  [fromMessage.messageFeatureKey]: fromMessage.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromMessage.messageFeatureKey]: fromMessage.reducer,
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
