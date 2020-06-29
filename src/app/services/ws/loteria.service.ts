import { Injectable } from '@angular/core';
import { Ws } from '@adonisjs/websocket-client';

@Injectable({ providedIn: 'root' })
export class LoteriaService {
  socket: any
  ws: any

  constructor() {
    this.ws = Ws('ws://localhost:3333/ws')
  }

  suscribe() {
    this.ws.connect()
    this.socket = this.ws.suscribe('loteria')
  }
}
