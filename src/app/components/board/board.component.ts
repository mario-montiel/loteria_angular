import { Component, OnInit } from '@angular/core';
import { LoteriaService } from 'src/app/services/ws/loteria.service';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  socket: any
  isActive = false;
  user: any
  board: any
  imagenes: any[] = []
  currCard = ""

  constructor(private loteriaService: LoteriaService, private router: Router) {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.board = router.getCurrentNavigation().extras.state
    let i = 0
    this.board.cards.forEach(item =>{
      this.imagenes[i] = item.path
      i++
    })
    console.log(this.imagenes[0])

    this.onData()
  }

  ngOnInit(): void {
  }

  public onCardSelect(card) {
    // const data = {
    //   user_id: JSON.parse(sessionStorage.getItem('user')).id,
    //   board_id: JSON.parse(sessionStorage.getItem('userBoard')).id,
    //   card_id: card.id
    // };
    console.log(this.board.cards)

    const data = {
      user_id: 1,
      board_id: 1,
      card_id: 1
    }

    // this.loteriaService.onCardSelect(data)
  }

  onWin(params) {
    this.loteriaService.onWin(params)
  }

  onData() {
    let socket = this.loteriaService.getSocket()
    socket.on('card', (card) => {
      this.currCard = card.path
    })
  }
}
