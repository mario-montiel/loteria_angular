import { Injectable } from '@angular/core';
import Ws from '@adonisjs/websocket-client';

@Injectable({ providedIn: 'root' })
export class LoteriaService {
  socket: any
  ws: any

  constructor() {
    this.ws = Ws('ws://localhost:3333', { path: 'ws' })
  }

  subscribe() {
    this.ws.connect()
    this.socket = this.ws.subscribe('loteria')
  }

  emitJoin(user_id) {
    this.socket.emit('join', user_id)
  }

  emitClose(user_id) {
    this.socket.emit('close', user_id)
  }

  emitCardSelect(data) {
    this.socket.emit('cardSelect', data)
  }

  emitWin(data) {
    this.socket.emit('win', data)
  }

  getSocket() { return this.socket }

  /*onCardSelect(cardClicked) {
    // console.log(cardClicked);
    this.socket.emit('cardSelect', cardClicked)
    this.socket.on('cardSelect', (data: any) => {
      console.log(data)
      // this.responseCard = (data)
      // console.log(this.responseCard);
    })
  }*/

  /*onWin(params) {
    this.socket.emit('win', params)
    this.socket.on('onWin', (data: any) => {
      console.log(data);
    })
  }*/
}
