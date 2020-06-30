import { Component, OnInit } from '@angular/core';
import { LoteriaService } from 'src/app/services/ws/loteria.service';
import { JsonPipe } from '@angular/common';
import Ws from '@adonisjs/websocket-client';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  socket: any
  ws: any
  isActive = false;
  constructor(private loteriaService: LoteriaService) {
    this.ws = Ws('ws://localhost:3333', { path: 'ws' })
    this.ws.connect()
    this.socket = this.ws.subscribe('loteria')
  }

  ngOnInit(): void {
    this.onJoin();
  }

  onJoin() {
    sessionStorage.getItem('user');
    console.log(sessionStorage.getItem('user'));
  }

  public onCardSelect(card) {
    // const data = {
    //   user_id: JSON.parse(sessionStorage.getItem('user')).id,
    //   board_id: JSON.parse(sessionStorage.getItem('userBoard')).id,
    //   card_id: card.id
    // };

    const data = {
      user_id: 1,
      board_id: 1,
      card_id: 1
    }

    // this.loteriaService.onCardSelect(data)
  }

  onWin(params) {
    const data = {
      id:1,
      como:params
    }
    this.socket.emit('win', data)
  }
}
