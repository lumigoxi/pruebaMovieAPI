import { Injectable } from '@angular/core';
import { QueryService } from './query.service';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private query: QueryService) {}

  private options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${environment.bearerToken}`,
    },
  };

  public initSess = () => {
    return this.query.get('authentication', '', this.options);
  };

  public getLstMovies = () => {
    return this.query.get(
      'movie/top_rated',
      'language=en-US&page=1',
      this.options
    );
  };

  public getLstMovieAccion = () => {
    return this.query;
  };

  public getLstGenero = () => {
    return this.query.get('genre/movie/list', '', this.options);
  };

  public getLstMovieByGenero(idGenero) {
    return this.query.get(`list/${idGenero}`, '', this.options);
  }

  public getLstEstreno() {
    return this.query.get(
      'movie/upcoming',
      'movie/upcoming?language=en-US&page=1',
      this.options
    );
  }
}
