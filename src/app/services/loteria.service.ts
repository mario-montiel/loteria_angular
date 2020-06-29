import { Injectable } from '@angular/core';
import { Ws } from '@adonisjs/websocket-client';

@Injectable({ providedIn: 'root' })
export class LoteriaService {
  baseUrl = 'http://127.0.0.1:3333/api/'
  socket: any
  ws: any

  constructor() {
    this.ws = Ws('ws://localhost:3333')
  }

  suscribe() {
    this.ws.connect()
    this.socket = this.ws.suscribe('loteria')
  }
}
