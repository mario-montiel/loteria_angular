import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.sass']
})
export class WinComponent implements OnInit {
  player: string
  constructor() { }

  ngOnInit(): void {
    this.player = JSON.parse(sessionStorage.getItem('user')).username
  }

}
