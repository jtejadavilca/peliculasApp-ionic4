import { Component, OnInit, Input } from '@angular/core';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true
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

}
