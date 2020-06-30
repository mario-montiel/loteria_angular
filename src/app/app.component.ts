import { Component, HostListener } from '@angular/core';
import { LoteriaService } from './services/ws/loteria.service';
import { UserService } from './services/http/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Loteria'

  constructor(private loteriaService: LoteriaService,
  private userService: UserService) {
    loteriaService.subscribe()
  }

  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event) {
    close()
  }

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHandler(event) {
    close()
  }

  close(): void {
    let user = JSON.parse(sessionStorage.getItem('user'))

    if (user != null) { this.loteriaService.emitClose(user.id) }

    this.userService.logout()
  }
}
