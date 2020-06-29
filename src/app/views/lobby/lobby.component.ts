import { Component, OnInit } from '@angular/core';
import { LoteriaService } from 'src/app/services/ws/loteria.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.sass']
})
export class LobbyComponent implements OnInit {
  constructor(private loteriaService: LoteriaService) {
    loteriaService.subscribe()
    let user = JSON.parse(sessionStorage.getItem('user'))
    loteriaService.emitJoin(user.id)
  }

  ngOnInit(): void {
  }

}
