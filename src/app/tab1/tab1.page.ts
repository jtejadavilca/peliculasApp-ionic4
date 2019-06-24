import { Component, OnInit } from '@angular/core';
import { ThemoviedbService } from '../services/themoviedb.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  peliculasPopulares: Pelicula[] = [];

  constructor( private theMovieService: ThemoviedbService ) {}

  ngOnInit() {
    this.theMovieService.getFeature()
      .subscribe( (resp) => {
        this.peliculasRecientes = resp.results;
      });

    this.getPopulares();
  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.theMovieService.getPopulares()
      .subscribe( (resp) => {
        const arrTmp = [...this.peliculasPopulares, ...resp.results];
        this.peliculasPopulares = arrTmp;
      });
  }
}
