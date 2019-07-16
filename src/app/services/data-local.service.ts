import { Injectable } from '@angular/core';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor( private storage: Storage,
               private toastService: ToastService) { }

  guardarPelicula( pelicula: PeliculaDetalle ) {

    let existe = false;

    for (const peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    let mensaje: string;
    if (existe) {
      this.peliculas = this.peliculas.filter( filter => pelicula.id !== pelicula.id );
      mensaje = 'Removido de favoritos';
    } else {
      mensaje = 'Agregado a favoritos';
    }

    this.toastService.presentToast(mensaje);

    this.peliculas.push( pelicula );
    this.storage.set('peliculas', this.peliculas);
  }
}
