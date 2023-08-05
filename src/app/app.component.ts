import { Component, OnInit } from '@angular/core';
import { debounce, debounceTime, Subject, switchMap, zip } from 'rxjs';
import { Movie, resultMovie } from './interfaces/movie';
import { MovieService } from './shared/services/movie.service';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'prueba1';
  private login = false;

  public lstCategorias: any[] = [];

  public lstMovies: Movie[] = [];
  public lstTrending: Movie[] = [];
  public lstEstreno: Movie[] = [];
  public terminoBusqueda = '';

  public baseURLImg = environment.urlImage;

  public currentIdGenero = 0;

  public statusSippner = false;

  constructor(private movvieService: MovieService) {
    this.statusSippner = true;
    this.movvieService
      .initSess()
      .pipe(
        // @ts-ignore
        switchMap((res: any) => {
          this.login = res.success;
          return zip(
            this.movvieService.getLstGenero(),
            this.movvieService.getLstMovies(),
            this.movvieService.getLstEstreno()
          );
        })
      )
      .subscribe(([resultGenero, res, resEstreno]) => {
        this.lstCategorias = resultGenero.genres;
        this.consultarGenero(this.lstCategorias[0].id);
        this.lstTrending = res.results;
        this.lstEstreno = resEstreno.results;
        this.statusSippner = false;
      });
  }

  ngOnInit(): void {
    this.sub.pipe(debounceTime(100)).subscribe((termino: string) => {
      this.terminoBusqueda = termino;
    });
  }

  public consultarGenero(idCategoria) {
    if (!idCategoria || idCategoria === '0') return;

    this.statusSippner = true;

    this.currentIdGenero = idCategoria;
    this.movvieService.getLstMovieByGenero(idCategoria).subscribe((data) => {
      this.lstMovies = data.items;
      this.statusSippner = false;
    });
  }

  private sub = new Subject();

  public buscarPelicula(value) {
    this.sub.next(value);
  }
}
