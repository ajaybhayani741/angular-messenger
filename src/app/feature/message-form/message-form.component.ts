import { AppState } from 'src/app/reducers/message.reducer';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { loadCreateMessage} from '../state/message.actions';
import { setLoadingSpinner } from 'src/app/shared/state/shared.actions';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
})
export class MessageFormComponent {
  public messageForm!: FormGroup;
  public isSubmited:boolean = false;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MessageFormComponent>,
    private store: Store<AppState>
  ) {
    this.messageForm = this.fb.group({
      userName: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public onSubmit() {
    if (this.messageForm.invalid) {
      this.isSubmited = true;
      this.messageForm.markAllAsTouched();
      return;
    }
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.onNoClick();
    const userName = this.messageForm.value.userName;
    const message = this.messageForm.value.message;
    const createdDate = new Date();
    this.store.dispatch(loadCreateMessage({ userName, message, createdDate }));
  }
  get formControls(): { [key: string]: AbstractControl } {
    return this.messageForm.controls;
  }
}
