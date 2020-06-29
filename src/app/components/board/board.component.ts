import { Component, OnInit } from '@angular/core';
import { LoteriaService } from 'src/app/services/ws/loteria.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {

  constructor(private loteriaService: LoteriaService) {
    loteriaService.suscribe();
  }

  ngOnInit(): void {}

  onCardSelect(card) {
    console.log(card);
  }
}
