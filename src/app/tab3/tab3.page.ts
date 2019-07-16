import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { ThemoviedbService } from '../services/themoviedb.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];
  generosFiltrados: Genre[];

  favoritosPorGenero: any[] = [];

  constructor( private dataLocalService: DataLocalService,
               private theMovieService: ThemoviedbService) {}

  async ngOnInit() {
    this.peliculas = await this.dataLocalService.cargarFavoritos();
    this.generos = await this.theMovieService.cargarGeneros();
    this.filtrarPelisPorGenero();
  }

  filtrarPelisPorGenero() {
    this.peliculas.forEach( peli => {
      if (peli.genres) {
        peli.genres.forEach( (genre: Genre) => {
          if ( this.generosFiltrados.findIndex(genreFilt => genre.id === genreFilt.id) === -1 ) {
            this.generosFiltrados.push(genre);
          }
        });
      }
    });
    console.log('this.generosFiltrados', this.generosFiltrados);
  }
}
