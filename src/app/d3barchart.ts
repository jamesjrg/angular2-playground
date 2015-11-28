/// <reference path="../../typings/tsd.d.ts" />
import {bootstrap, Component, Directive, CORE_DIRECTIVES, Inject, OnChanges, Attribute, ElementRef} from 'angular2/angular2';

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
  directives: [ CORE_DIRECTIVES, BarGraph ],
  template: `
  <h2>A D3 bar chart from Angular 2</h2>
  
  <bar-graph
    bind-data="graphData"
    width="500"
    height="130"
  >
  </bar-graph>
  `
})
class AppComponent {
  public title = 'A D3 bar chart from Angular 2';
  graphData: Array<number>;
  
  constructor() {
    this.graphData = [ 10,20,30,40,60 ];
  }
}

bootstrap(AppComponent);
