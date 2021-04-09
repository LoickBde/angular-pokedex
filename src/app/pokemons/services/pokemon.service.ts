import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PagedData } from '../model/paged-data.model';
import { Pokemon } from '../model/pokemon.model';
import { catchError } from 'rxjs/operators';
import { PokemonDetail } from '../model/pokemon-detail.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonApiUrl: string = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io';

  constructor(private http: HttpClient) { }

  public getTenPokemons(): Observable<PagedData<Pokemon>> {
    const url: string = this.pokemonApiUrl + '/pokemons';
    return this.http.get<PagedData<Pokemon>>(url)
    .pipe(
      catchError(this.handleError<PagedData<Pokemon>>('getTenPokemons', undefined))
    );
  }

  public getPokemons(limit: number, offset: number, term?: string) : Observable<PagedData<Pokemon>> {
    const url = `${this.pokemonApiUrl}/pokemons`;
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    if (term) {
      params = params.set('search', term);
    }

    return this.http.get<PagedData<Pokemon>>(url, {params})
    .pipe(
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons', undefined))
    );
  }

  public getPokemon(id: number): Observable<PokemonDetail> {
    const url = this.pokemonApiUrl + '/pokemons/' + id;
    return this.http.get<PokemonDetail>(url)
    .pipe(
      catchError(this.handleError<PokemonDetail>('getPokemon', undefined))
    );
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

