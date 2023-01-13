import { createFeatureSelector, createSelector } from '@ngrx/store';

export const MESSAGE_STATE_NAME = 'message';

const stateMessage = createFeatureSelector<any>(MESSAGE_STATE_NAME);
export const getAllMessages = createSelector(stateMessage, state => {
    return state.messages;
});
