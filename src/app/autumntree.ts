import {bootstrap} from 'angular2/platform/browser';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Component, Directive, Inject, OnChanges, Attribute, ElementRef} from 'angular2/core';

@Directive({
  selector:   'autumn-tree'
})
class AutumnTree {
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
        'class': 'autumntree'
      }).
      style({
        'width':  width  + 'px',
        'height': height + 'px',
      }).
      selectAll('div');
  }    
}  


@Component({
  selector: 'my-app',
  directives: [ CORE_DIRECTIVES, AutumnTree ],
  template: `
  <h2>A port of someone else\'s F# fractal code to D3</h2>
  
  <autumn-tree
    width="500"
    height="130"
  >
  </autumn-tree>
  `
})
class AppComponent {
  public title = 'A port of someone else\'s F# fractal code to D3';
  
}

bootstrap(AppComponent, []);
