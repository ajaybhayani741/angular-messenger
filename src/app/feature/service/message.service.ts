import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',

})
export class MessageService {
  private durationInSeconds: number = 2;
  constructor(
    private fireStore: AngularFirestore,
    private snakBar: MatSnackBar
    ) {}

  public getMessages() {
    return this.fireStore
      .collection('messages', (ref) => ref.orderBy('creationDate', 'desc'))
      .snapshotChanges();
  }

  public createMessage(userName: string, message: string, creationDate: Date) {
    const formData = {
      userName: userName,
      message: message,
      creationDate: creationDate,
    };
    return this.fireStore.collection('messages').add(formData);
  }

  showSnackBar(message:string,button:string='OK'){
    this.snakBar.open(message, button, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: this.durationInSeconds * 1000
    });
  }
}
