import { Component, OnInit, ViewChild } from '@angular/core';
//import { Picture } from 'src/app/assets/image';
import { Ws } from '@adonisjs/websocket-client'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  ws: any;
  socket: any;
  constructor() { }

  ngOnInit(): void {
    this.ws = Ws('ws://localhost:3333')
    this.connectWS()
  }

  connectWS() {
    this.ws.connect();
    this.socket = this.ws.subscribe('loteria');
  }
}
