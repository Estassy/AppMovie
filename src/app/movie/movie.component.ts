import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {

  constructor() { }

  @Input() movie: any
  @Output() eventOut: EventEmitter<any> = new EventEmitter<any>();

  // getDescription(movie : any) : any{
  //   console.log('getDescription called with:', movie);
  //   this.eventOut.emit(movie.imdbID)
  //   console.log(movie.imdbID)
  // }
}
