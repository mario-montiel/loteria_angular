import { Component, OnInit, ViewChild } from '@angular/core';
import { Picture } from 'src/app/assets/image';
import Ws from 'adonis-websocket-client';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  ws: any;
  socket: any;
  constructor() { }

  ngOnInit(): void { this.connectWS(); }

  connectWS() {
    this.ws = Ws('ws://127.0.0.1:3333');
    this.ws.connect();

    this.socket = this.ws.subscribe('loteria');
  }
}
