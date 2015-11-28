/// <reference path="../../typings/tsd.d.ts" />
import {bootstrap, Component, Directive, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';

class Hero {
  id: number;
  name: string;
}

var heroes: Hero[] = [
  { "id": 11, "name": "Mr. Nice" },
  { "id": 12, "name": "Narco" },
  { "id": 13, "name": "Bombasto" },
  { "id": 14, "name": "Celeritas" },
  { "id": 15, "name": "Magneta" },
  { "id": 16, "name": "RubberMan" },
  { "id": 17, "name": "Dynama" },
  { "id": 18, "name": "Dr IQ" },
  { "id": 19, "name": "Magma" },
  { "id": 20, "name": "Tornado" }
];

@Component({
  selector: 'my-app',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES ],
  styles:[`
  .heroes {list-style-type: none; margin-left: 1em; padding: 0; width: 10em;}
  .heroes li { cursor: pointer; position: relative; left: 0; transition: all 0.2s ease; }
  .heroes li:hover {color: #369; background-color: #EEE; left: .2em;}
  .heroes .badge {
    font-size: small;
    color: white;
    padding: 0.1em 0.7em;
    background-color: #369;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -1px;
  }
  .selected { background-color: #EEE; color: #369; }
  `],
  template: `
  <h2>My Heroes</h2>
  <ul class="heroes">
    <li *ng-for="#hero of heroes"
    [ng-class]="getSelectedClass(hero)"
    (click)="onSelect(hero)">
      <span class="badge">{{hero.id}}</span> {{hero.name}}
    </li>
  </ul>
  
  <div *ng-if="selectedHero">
    <h2>{{selectedHero.name}} details!</h2>
    <div><label>id: </label>{{selectedHero.id}}</div>
    <div>
        <label>name: </label>
        <input [(ng-model)]="selectedHero.name" placeholder="name"></input>
    </div>
  </div>
  `
})
class AppComponent {
  public title = 'Tour of Heroes';
  public heroes = heroes;
  public selectedHero: Hero;
  
  getSelectedClass(hero: Hero) {
    return { 'selected': hero === this.selectedHero };
  }
  
  onSelect(hero: Hero) { this.selectedHero = hero; }
}

bootstrap(AppComponent);