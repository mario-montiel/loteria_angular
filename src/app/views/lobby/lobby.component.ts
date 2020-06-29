import { Component, OnInit } from '@angular/core';
import { LoteriaService } from 'src/app/services/ws/loteria.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.sass']
})
export class LobbyComponent implements OnInit {
  //activeUsers

  constructor(private loteriaService: LoteriaService) {
    loteriaService.subscribe()

    let user = JSON.parse(sessionStorage.getItem('user'))
    loteriaService.emitJoin(user.id)

    /*this.loteriaService.emitCardSelect({
      card_id: 1,
      user_id: user.id,
      board_id: 1
    })*/
  }

  ngOnInit(): void {
    /*let socket = this.loteriaService.getSocket()
    socket.on('user', (response) => {
      alert(response)
    })*/
  }
}
