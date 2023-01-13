import { AppState } from 'src/app/reducers/message.reducer';
import { MessageService } from './../service/message.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';
import {
  loadCreatedMessage,
  loadCreateFail,
  loadCreateMessage,
  loadMessage,
  loadMessagesFailure,
  loadMessagesSuccess,
} from './message.actions';
import { Store } from '@ngrx/store';
import { setLoadingSpinner } from 'src/app/shared/state/shared.actions';

@Injectable()
export class MessageEffects {
  constructor(
    private actions$: Actions,
    private messageService: MessageService,
    private store: Store<AppState>,
  ) {}

  loadMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMessage),
      mergeMap((action: any) => {
        return this.messageService.getMessages().pipe(
          map((data) => {
            const messages = data.map((e: any) => {
              return Object.assign(
                { id: e.payload.doc.id },
                e.payload.doc.data()
              );
            });
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return loadMessagesSuccess({ message: messages });
          }),
          catchError((error) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.messageService.showSnackBar('Something went wrong !');
            return of(loadMessagesFailure({ error: error }));
          })
        );
      })
    );
  });

  createMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCreateMessage),
      exhaustMap((action) => {
        return this.messageService
        .createMessage(action.userName, action.message, action.createdDate)
          .then(
            (response) => {
              this.messageService.showSnackBar('Message added successfully !!')
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return loadCreatedMessage({
                message: 'Message sent successfully',
              });
            }
          ).catch((error)=>{
            this.messageService.showSnackBar('Something went wrong !');
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return loadCreateFail({error:error})

          });
      })
    );
  });
}
