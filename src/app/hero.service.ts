import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  private heroesUrl = 'api/heroes'; // Url to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }
  
  // Get hero by id. Will 404 if id not found
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  // GET hero by id. Return 'undefined' when id not found
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
    .pipe(
      map(heroes => heroes[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? 'fetched' : 'did not find';
        this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // Get heroes whose name contains the search term
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) : 
        this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /// Save methods ///
  // POST: add a new hero to the server
  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  //DELETE: delete the Hero from the server
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<any>('deleteHero'))
    );
  }

  // PUT: update the hero on the server
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http Operation that failed
   * Let the app continue.
   * 
   * @param operation - name of the operation that failed 
   * @param result - optional value to return as the observable result
   * 
   */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // send error to the remote logging infrastructure
      console.error(error); // log to the console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // let the app keep running by returning an empty result 
      return of(result as T);
    };
  }

  /**
   * Log a HeroService Message with the messageService
   */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
