import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loser',
  templateUrl: './loser.component.html',
  styleUrls: ['./loser.component.sass']
})
export class LoserComponent implements OnInit {
  player: string
  constructor() { }

  ngOnInit(): void {
    this.player = JSON.parse(sessionStorage.getItem('user')).username
  }

}
