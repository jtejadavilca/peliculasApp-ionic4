import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const  URL_IMAGE = environment.imgPath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
// "https://image.tmdb.org/t/p/w500"+pelicula.backdrop_path
  transform(img: string, size: string = 'w500'): any {
    if (!img) {
      return './assets/no-image-banner.jpg';
    }

    const imgUrl = `${URL_IMAGE}/${ size }${ img }`;

    return imgUrl;
  }

}
