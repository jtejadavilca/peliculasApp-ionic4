import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaMDB, PeliculaDetalle, RespuestaCreditos, Genre } from '../interfaces/interfaces';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class ThemoviedbService {

  popularesPage = 0;
  generos: any[] = [];

  constructor( private http: HttpClient ) { }

  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;

    return this.http.get<T>( query );
  }

  getFeature() {
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;
    const mesString = mes < 10 ? '0' + mes : mes;

    const inicio = `${ hoy.getFullYear() }-${ mesString }-01`;
    const fin = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`;

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);
  }

  getPopulares() {
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage }`;

    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getPeliculaDetalle(id: string) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }
  getActoresPelicula(id: string) {
    return this.ejecutarQuery<RespuestaCreditos>(`/movie/${id}/credits?a=1`);
  }

  buscarPelicula( nombre: string ) {
    return this.ejecutarQuery<RespuestaCreditos>(`/search/movie?query=${ nombre }`);
  }
  cargarGeneros(): Promise<Genre[]> {

    return new Promise( resolve => {
      this.ejecutarQuery( `/genre/movie/list?a=1` )
          .subscribe( resp => {
            this.generos = resp['genres'];
            resolve(this.generos);
          });
    });

  }
}
