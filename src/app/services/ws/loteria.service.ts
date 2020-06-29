import { Injectable } from '@angular/core';
import Ws from '@adonisjs/websocket-client';

@Injectable({ providedIn: 'root' })
export class LoteriaService {
  socket: any
  ws: any

  constructor() {
    this.ws = Ws('ws://127.0.0.1:3333')
  }

  suscribe() {
    this.ws.connect()
    this.socket = this.ws.suscribe('loteria')
    this.socket.on('open', () => {
      console.log('connect');
    });
    this.socket.on('close', () => {
      console.log('close');
    });

    // this.socket.connect((error, connected) => {
    //   if (error) {
    //     // do something
    //     console.log(error);
    //   }
    //   if (connected){
    //     console.log(connected);
    //   }
    // });
  }
}
