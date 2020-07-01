import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/http/user.service';
import { Router } from '@angular/router';
import { LoteriaService } from 'src/app/services/ws/loteria.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  ws: any
  socket: any
  username: string
  constructor(public userService: UserService, public router: Router, private loteriaService: LoteriaService) {
      const socket = this.loteriaService.getSocket()
      socket.on('error', (fuckError) => {
        console.log(fuckError)
      })
    }

  logout() {
    let user = JSON.parse(sessionStorage.getItem('user'))
    this.loteriaService.emitClose(user.id)

    sessionStorage.removeItem('user')
    this.userService.logout()
    this.router.navigateByUrl('')
  }

  ngOnInit(): void {
    if (this.userService.hasToken()) {
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.username = user.username
    }
  }
}
