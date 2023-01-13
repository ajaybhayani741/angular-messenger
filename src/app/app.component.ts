import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { HeaderItem } from './shared/interfaces/common';
import { Observable } from 'rxjs';
import { getLoading } from './shared/state/shared.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'messenger';
  public showLoading:Observable<boolean>;
  constructor(private store:Store){
    this.showLoading = this.store.select(getLoading);
  }
  hedaerItems: HeaderItem[] = [
    {
      title: 'Home',
      url: '',
    },
    {
      title: 'Messages',
      url: 'messages',
    },
  ];


}
