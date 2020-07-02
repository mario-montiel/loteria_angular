import { Component, OnInit } from '@angular/core';
import { LoteriaService } from 'src/app/services/ws/loteria.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { WinComponent } from '../dialogs/win/win.component';
import { DrawComponent } from '../dialogs/draw/draw.component';
import { LoserComponent } from '../dialogs/loser/loser.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  board: any
  currCard = ""
  socket: any
  user: any
  winButtons = true

  constructor(private loteriaService: LoteriaService, private router: Router,
  public dialog: MatDialog) {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.board = router.getCurrentNavigation().extras.state
    console.log(this.board)

    this.onData()
  }

  ngOnInit(): void { }

  public onCardSelect(card_id) {
    let data = {
      user_id: this.user.id,
      board_id: this.board.id,
      card_id: card_id
    };

    this.loteriaService.emitCardSelect(data)
  }

  onWin(params) {
    this.loteriaService.onWin({
      id: this.user.id,
      como: params
    })
  }

  onData() {
    let socket = this.loteriaService.getSocket()
    socket.on('card', (card) => {
      this.currCard = card.path
    })

    socket.on('cardSelect', (data) => {
      if (data.user_id == this.user.id && data.success) {
        //angular
        data.card_id
        this.board.cards.forEach(card => {
          if (card.id == data.card_id) {
            card.pivot.selected = 1
          }
        });
      }
    })

    /* PARA EMITIR WIN: this.loteriaService.emitWin(data)  */
    socket.on('onWin', (data) => {
      switch (data.win) {
        case 'draw':
          // TODOS
          this.dialog.open(DrawComponent)
          break
        case 'yes':
          this.winButtons = false
          // TODOS
          this.dialog.open(WinComponent, {
            data:{
              username: data.username
            }
          });
          break
        case 'no':
          // Individual
          // Verfifica el data.id con el id del sessionStorage, si smn
          if (data.user_id == this.user.id) {
            this.dialog.open(LoserComponent);
          }
          break
      }
    })
  }
}
