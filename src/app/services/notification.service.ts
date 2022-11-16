import { Injectable } from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private message: NzMessageService) { }

  showMessage(type: string, message: string) {
    this.message.create(type, message);
  }

}
