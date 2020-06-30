import { Component, OnInit } from '@angular/core';
import { LoteriaService } from 'src/app/services/ws/loteria.service';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { WinComponent } from '../dialogs/win/win.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  isActive = false;
  user: any
  board: any
  currCard = ""

  constructor(private loteriaService: LoteriaService, private router: Router, public dialog: MatDialog) {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.board = router.getCurrentNavigation().extras.state

    this.onData()
  }

  ngOnInit(): void {
    // this.userID = JSON.parse(sessionStorage.getItem('user'))
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

    //this.loteriaService.onCardSelect(data)
  }

  onWin(params) {
    const data = {
      id: JSON.parse(sessionStorage.getItem('user')).id,
      como: params
    }
    this.loteriaService.onWin(data)
    let socket = this.loteriaService.getSocket()
    socket.on('onWin', (whoWin: any) => {
      // console.log('WTF: ', whoWin);
      this.dialog.open(WinComponent);
    })
  }

  onData() {
    let socket = this.loteriaService.getSocket()
    socket.on('card', (card) => {
      this.currCard = card.path
    })

    /* PARA EMITIR WIN: this.loteriaService.emitWin(data)  */
    socket.on('onWin', (data) => {
      switch(data.win) {
        case 'draw':
          // TODOS
          // Muestra que empataron y que todos estan pendejos
          break
        case 'yes':
          // TODOS
          // Muestra el ganador mostrando el data.id
          break
        case 'no':
          // Individual
          // Verfifica el data.id con el id del sessionStorage, si smn,
          // se le muestra al usuario que esta bien estupido y que aun no gana
          break
        case
      }
    })
  }
}
