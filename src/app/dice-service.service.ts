import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket-service.service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class DiceService {
  messages: Subject<any>;

  // this gets the call from the websocket
  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService.connect().map((response: any): any => {
        return response;
      })
  }


  rollSingleDie(msg) {
    this.messages.next(msg);
  }
}
