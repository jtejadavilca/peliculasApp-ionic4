import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';
import { Pelicula } from '../../interfaces/interfaces';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {


  @Input() peliculas: Pelicula[] = [];

  slideOpts = {
    slidesPerView: 1.3,
    freeMode: true
  };

  constructor( public modalCtrl: ModalController ) { }

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
