import { Component, OnInit, Input } from '@angular/core';
import { ThemoviedbService } from '../../services/themoviedb.service';
import { Subscriber } from 'rxjs';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;
  peliculaDetalle: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;
  iconOutlineNoExiste: string;

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5
  };

  constructor( private theMovieService: ThemoviedbService,
               private modalCtrl: ModalController,
               private dataLocal: DataLocalService ) {
               }

  async ngOnInit() {

    const existe = await this.dataLocal.existePelicula( this.id );
    console.log('existe', existe);
    this.peliculaExisteEnFavoritos(existe);

    this.theMovieService.getPeliculaDetalle(this.id)
    .subscribe( resp => {
      console.log('resp', resp);
      this.peliculaDetalle = resp;
    });

    this.theMovieService.getActoresPelicula( this.id )
    .subscribe( resp => {
      this.actores = resp.cast;
    });
  }

  regresar() {
    console.log('Regresar...');
    this.modalCtrl.dismiss();
  }
  favorito() {
    console.log('this.dataLocal', this.dataLocal);

    this.peliculaExisteEnFavoritos(this.dataLocal.guardarPelicula( this.peliculaDetalle ));

  }
  peliculaExisteEnFavoritos( existe: boolean ) {
    this.iconOutlineNoExiste = !existe ? '-outline' : '';
  }
}
