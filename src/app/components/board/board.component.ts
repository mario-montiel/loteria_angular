import { Component, OnInit, ViewChild } from '@angular/core';
//import { Picture } from 'src/app/assets/image';
import { LoteriaService } from 'src/app/services/ws/loteria.service'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  constructor(private loteriaService: LoteriaService) {
    loteriaService.suscribe()
  }

  ngOnInit(): void { }
}
