import { Component } from '@angular/core';
import { ThemoviedbService } from '../services/themoviedb.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  buscando = false;
  textoBuscar = '';
  peliculas: Pelicula[] = [];
  ideas = ['Spiderman', 'Avengers', 'El señor de los anillos'];

  constructor( private theMovieDBServive: ThemoviedbService,
               private modalCtrl: ModalController ) {}

  buscar(event) {
    const valBusq: string = event.detail.value;
    if (valBusq.length === 0) {
      this.peliculas = [];
      return;
    }

    this.buscando = true;
    console.log('valBusq', valBusq);
    this.theMovieDBServive.buscarPelicula(valBusq)
        .subscribe( resp => {
          this.buscando = false;
          // tslint:disable-next-line:no-string-literal
          this.peliculas = resp['results'];
        });
  }

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
