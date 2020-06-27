import { Component, OnInit, ViewChild } from '@angular/core';
import { Picture } from 'src/app/assets/image';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  imgMain: '';
  // imgs: any;
  loteriaArray: any[] = [];
  nameCard: string;
  interval: any;
  cartas: any;
  // Esto vendria siendo las cartas del tablero
  // la propiedad status es para saber si ya esta volteada la carta
  // deben obtenerse de la bd de forma aleatoria
  Picture = [
    {id: 1, carta: 'valiente', status: false},
    {id: 2, carta: 'luna', status: false},
    {id: 3, carta: 'sol', status: false},
    {id: 4, carta: 'arbol', status: false},
    {id: 5, carta: 'chalupa', status: false},
    {id: 6, carta: 'diablito', status: false},
    {id: 7, carta: 'gorrito', status: false},
    {id: 8, carta: 'tambor', status: false},
    {id: 9, carta: 'camaron', status: false}];

  constructor() { }

  // Este es la etiqueta html img
  @ViewChild('loteriaCarta', {static: true}) loteriaCarta: HTMLImageElement;

  ngOnInit(): void {}

  loteria_play() {

    this.show_shuffle_card_main();

    // En este arreglo obtengo solo los nombres de las cartas de la base de datos (de forma aleatoria)
    // para realizar comparaciones
    this.loteriaArray.push('gallo', 'valiente', 'gorrito', 'chalupa', 'luna', 'sol', 'arbol',
          'barril', 'camaron', 'catrin', 'negrito', 'pajaro', 'tambor', 'alacran',
          'apache', 'arpa', 'campana', 'diablito', 'cantarito', 'cazo', 'corazon', 'calavera');

    this.generate_board();
  }

  show_shuffle_card_main() {
      const mainCard = document.getElementById('loteria-carta');
      let tCards = 0;
      this.interval = setInterval(() => {
        // Le envio la url donde esta la carpeta para mostrarla en el html --- La variable esta arriba
        // Lo obtengo del arreglo loteriaArray y está comentado porque puse la imagen de la api que esta en el html
        // this.imgMain = 'img/cards/' + this.loteriaArray[tCards] + '.jpg';
        mainCard.setAttribute('value', this.loteriaArray[tCards]);
        this.nameCard = this.loteriaArray[tCards];
        tCards++;
        console.log(tCards);
        if (tCards === this.loteriaArray.length) {
          // Con esto se detiene el setInterval
          clearInterval(this.interval);
        }
      }, 4000);
  }

    generate_board() {

      const cards: any = document.querySelectorAll('.btn-cards');
      const images: any = document.querySelectorAll('.loteria-image');

      for (let index = 0; index < cards.length; index++) {
        // Le agrego el valor de la carta que le tocó a cada div
        // para hacer la comparación al hacerle click a la imagen
          cards[index].setAttribute('value', this.Picture[index].carta);
      }

      for (let index = 0; index < images.length; index++) {
        // Le agrego la dirección de la imagen de la loteria a cada etiqueta image del html
        images[index].src = 'public/img/loteria-pruebon/' + this.Picture[index].carta + '.jpg';
      }
    }

  comprobar_carta(params: any) {
      console.log('click imagen: ', params);
      // Esto lo hago para saber con que div le di click y poder compararla con
      // la imagen principal (la que cambia cada 4 segundos)
      const calcularIndex = params.id;
      const index = calcularIndex.substring(13, 14);
      if (params.attributes[3].value === this.nameCard) {
          this.cartas = document.getElementById(params.children[0].id);
          this.cartas.src = 'public/img/loteria-pruebon/valiente-frijol.png';
          this.Picture[index - 1].status = true;
          console.log('IMAGEN', this.Picture);
          console.log('Posicion de la Imagen: ', this.Picture[index - 1]);
      }
  }

  ganar(){
      this.cartas = document.getElementById('loteria-carta');
      // if (objects[0]['status'] === true && objects[1]['status'] === true && objects[2]['status'] === true) {
      if (this.Picture[0].status && this.Picture[1].status && this.Picture[2].status) {
        clearInterval(this.interval);
        alert('ganaste de forma lineal');
        this.cartas.src = 'public/img/loteria-pruebon/valiente-frijol.png';
      }
  }
}
