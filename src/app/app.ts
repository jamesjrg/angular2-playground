/// <reference path="../../typings/tsd.d.ts" />
//how does this know to use the typescript definition in node_modules? ¯\_(ツ)_/¯
import {bootstrap, Component, Directive, CORE_DIRECTIVES, FORM_DIRECTIVES, Inject, OnChanges, Attribute, ElementRef} from 'angular2/angular2';
import * as d3 from 'd3';

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

@Directive({
  selector:   'bar-graph',
  properties: [ 'data' ]
})
class BarGraph implements OnChanges {
  data: Array<number>;
  divs: any;
  constructor(
    @Inject(ElementRef) elementRef: ElementRef,
    @Attribute('width') width: string,
    @Attribute('height') height: string) {

    var el:any = elementRef.nativeElement;
    var graph:any = d3.select(el);

    this.divs = graph.
      append('div').
      attr({
        'class': 'chart'
      }).
      style({
        'width':  width  + 'px',
        'height': height + 'px',
      }).
      selectAll('div');
  }
    
  render(newValue) {
    if (!newValue) return;

    this.divs.data(newValue).enter().append('div')
      .transition().ease('elastic')
      .style('width', d => d + '%')
      .text(d => d + '%');

  }

  onChanges() {
    this.render(this.data);
  }
}  


@Component({
  selector: 'my-app',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
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
  <div id="d3test"></div>
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
  
  constructor() {
    d3.select("body").append("p").text("New paragraph!");
  }
  
  getSelectedClass(hero: Hero) {
    return { 'selected': hero === this.selectedHero };
  }
  
  onSelect(hero: Hero) { this.selectedHero = hero; }
}

bootstrap(AppComponent);
