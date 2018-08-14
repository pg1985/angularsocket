import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})

/**
 * A websocket service.  This connects to my socket and using the 'resn' value
 * retrieves a random number between 1-6 for a dice roll.
 */
export class WebsocketService {

  private socket;

  constructor() { }

  connect(): Rx.Subject<MessageEvent> {

    this.socket = io('http://localhost:5000');

    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        console.log("Received message from Websocket Server");
        observer.next(data);
      });

      //handling the response from the server
      this.socket.on('response', (data) => {
        observer.next(data.text);
      });
      return () => {
        this.socket.disconnect();
      }
    });

    //this makes the call to the socket.  The server only requires a message to be sent.
    //No data is needed, so an empty object is ok for now.
    //TODO: add ability to pass in info for different dice rolls
    let observer = {
      next: (data: Object) => {
        this.socket.emit('resn', {});
      },
    };

    return Rx.Subject.create(observer, observable);
  }

}
