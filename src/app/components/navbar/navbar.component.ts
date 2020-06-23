import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  username : string

  constructor(public userService: UserService, public router: Router) {

  }

  logout() {
    sessionStorage.removeItem('user')
    this.userService.logout()
    this.router.navigateByUrl('')
  }

  ngOnInit(): void {
    if (this.userService.hasToken()) {
      console.log(sessionStorage.getItem('user'))
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.username = user.username
    }
  }
}
