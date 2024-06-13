import {TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie.component';

describe('MovieComponent', () => {
  let component: MovieComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieComponent]
    })
    component = TestBed.inject(MovieComponent);
   
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should getDescription'), () => {
  //   const movie: any = {
  //     "id": 1,
  //     "descpction": "This is a movie description",
  //     "imdbID": "tt11" 
  //   }
    
  //   //S'assuere qu'il est correctement emit
  //   spyOn(component.eventOut, 'emit')
    
  //   component.getDescription(movie);
  //   //expect(component.getDescription(movie)).toBe('This is a movie description');
  //   expect(component.eventOut.emit).toHaveBeenCalledWith("tt11")
    
  // }
});
