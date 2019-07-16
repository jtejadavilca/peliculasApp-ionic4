import { Injectable } from '@angular/core';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastService } from './toast.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor( private storage: Storage,
               private toastService: ToastService) {
                 this.cargarFavoritos();
  }

  guardarPelicula( pelicula: PeliculaDetalle ) {

    let existe = false;
    let agregado = false;

    console.log('pelicula.id', pelicula.id);
    for (const peli of this.peliculas) {
      console.log('peli.id', peli.id);
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    let mensaje: string;
    if (existe) {
      this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id );
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push( pelicula );
      mensaje = 'Agregado a favoritos';
      agregado = true;
    }

    this.toastService.presentToast(mensaje);
    this.storage.set('peliculas', this.peliculas);
    return agregado;
  }

  async cargarFavoritos() {
    const peliculas = await this.storage.get('peliculas');

    this.peliculas = peliculas || [];

    return this.peliculas;
  }

  async existePelicula( id ) {
    id = Number(id);

    await this.cargarFavoritos();

    console.log('id', id);
    const existe = this.peliculas.find( peli => {
      console.log('peli.id', peli.id);
      return peli.id === id;
    });

    return (existe) ? true : false;
  }
}
