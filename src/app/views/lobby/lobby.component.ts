import { Component, OnInit } from '@angular/core';
import { LoteriaService } from 'src/app/services/ws/loteria.service';
import { UserService } from 'src/app/services/http/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.sass']
})
export class LobbyComponent implements OnInit {
  activeUsers: User[]
  user: any
  message = 'Esperando usuarios...'

  constructor(private loteriaService: LoteriaService,
  private userService: UserService) {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    loteriaService.emitJoin(this.user.id)

    this.userService.activeUsers().subscribe(
      data => { this.activeUsers = data },
      error => { console.log(error) }
    )

    this.getInfo()
  }

  getInfo(): void {
    let socket = this.loteriaService.getSocket()
    socket.on('error', (fuckError) => {
      console.log(fuckError)
    })
    socket.on('connUser', (newUser) => {
      if (newUser.id != this.user.id) { this.activeUsers.push(newUser) }
    })
    socket.on('descUser', (oldUser) => {
      this.activeUsers = this.activeUsers.filter(user => user.id != oldUser.id)
    })
    socket.on('gameStatus', (gameStatus) => {
      switch (gameStatus) {
        case 'inactive': this.message = 'Esperando usuarios...'
          break
        case 'playing': this.message = 'Juego en curso. Intentalo más tarde'
          break
        case 'preparing': this.message = 'Preparando juego'
          break
        case 'START':
          // Aquí empieza el desmadre
          alert('A los putazos')
          break
      }
    })
    socket.on('timer', (seconds) => {
      this.message = 'Preparando juego en ' + seconds + 'segundos'
    })
  }

  ngOnInit(): void { }
}
