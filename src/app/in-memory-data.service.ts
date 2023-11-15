import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  createDb() {
    const heroes = [
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' },
      { id: 21, name: 'Eskei'},
      { id: 22, name: 'Kevin'},
      { id: 23, name: 'Rabbs'},
      { id: 24, name: 'Aceteasea'},
      { id: 25, name: 'Zimastack'},
      { id: 26, name: 'Terasofts'},
      { id: 27, name: 'SuuefTech'},
      { id: 28, name: 'Shadow'},
      { id: 29, name: 'Daudi'},
      { id: 30, name: 'Abdul'},
      { id: 31, name: 'Hakim'},
      { id: 32, name: 'Swalleh'}
    ];

    return {heroes};
  }

  // Overrides the genId Method to ensure that a hero always has an id
  // If the heroes array is empty
  // the method below return the initial number 
  // if the heroes array is not empty, the method below returns the highest 
  // hero id + 1.

  getId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
