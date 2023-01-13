import { createAction, props } from '@ngrx/store';
import { MessageData } from '../interface/message';

export const LOADMESSAGE = '[message page] load messages start';
export const LOAD_MESSAGE_SUCCESS = '[message page] load messages success';
export const LOAD_MESSAGE_FAIL = '[message page] load message fail';

export const LOAD_CREATE_MESSAGE = '[message page] load create message';
export const LOAD_CREATE_MESSAGE_SUCCESS = '[message page] message created successfully';
export const LOAD_CREATE_MESSAGE_FAIL = '[message page] message create failed';

//Action for create message
export const loadCreateMessage = createAction(LOAD_CREATE_MESSAGE, props<{userName:string, message:string, createdDate:Date}>());
export const loadCreatedMessage = createAction(LOAD_CREATE_MESSAGE_SUCCESS, props<{message:string}>());
export const loadCreateFail = createAction(LOAD_CREATE_MESSAGE_FAIL , props<{error:string}>());


//Action for get messages
export const loadMessages = createAction(
  LOADMESSAGE
);
export const loadMessage = createAction(LOADMESSAGE);
export const loadMessagesSuccess = createAction(
  LOAD_MESSAGE_SUCCESS,
  props<{ message: MessageData[] }>()
);

export const loadMessagesFailure = createAction(
  LOAD_MESSAGE_FAIL,
  props<{ error: string }>()
);
