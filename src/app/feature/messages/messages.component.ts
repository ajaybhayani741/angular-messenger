import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers/message.reducer';
import { setLoadingSpinner } from 'src/app/shared/state/shared.actions';
import { MessageData } from '../interface/message';
import { MessageFormComponent } from '../message-form/message-form.component';
import { loadMessage } from '../state/message.actions';
import { getAllMessages } from '../state/message.selectors';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  public data!:MessageData[];
  displayedColumns2: string[] = ['id', 'name','creationDate', 'message'];
  dataSource1 = new MatTableDataSource<MessageData>(this.data);
  constructor(
    private dialog: MatDialog,
    private store:Store<AppState>,
    ){
      this.getMessages();
    }

  openDialog(){
    const dialogRef = this.dialog.open(MessageFormComponent, {
      width:'700px',
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }
  private getMessages(){
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loadMessage());
    this.store.select(getAllMessages).subscribe((messageData: MessageData[]) => {
      this.dataSource1 = new MatTableDataSource<MessageData>(messageData);
    });
  }
}
