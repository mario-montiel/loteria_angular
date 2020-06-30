import { Component, OnInit } from '@angular/core';
import { LoteriaService } from 'src/app/services/ws/loteria.service';
import { UserService } from 'src/app/services/http/user.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.sass']
})
export class LobbyComponent implements OnInit {
  activeUsers: Object[]

  constructor(private loteriaService: LoteriaService,
  private userService: UserService) {
    let user = JSON.parse(sessionStorage.getItem('user'))
    loteriaService.emitJoin(user.id)

    this.userService.activeUsers().subscribe(
      data => { this.activeUsers = data },
      error => { console.log(error) }
    )

    this.getInfo()
  }

  getInfo(): void {
    let socket = this.loteriaService.getSocket()
    socket.on('connUser', (newUser) => {
      this.activeUsers.push(newUser)
    })
    socket.on('dessUser', (oldUser) => {
      console.log(oldUser)
      this.activeUsers.splice(
        this.activeUsers.findIndex(oldUser)
      )
    })
  }

  ngOnInit(): void { }
}
