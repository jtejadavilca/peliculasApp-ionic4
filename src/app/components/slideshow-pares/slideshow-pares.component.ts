import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10
  };

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

  async verDetalle(id: string) {
    console.log('verDetalle de : ', id);
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }

  onClick() {
    this.cargarMas.emit();
  }
}
