import {TestBed } from '@angular/core/testing';
import { MoviesComponent } from './movies.component';
import { DataService } from '../data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let dataService: DataService
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoviesComponent, DataService],
      imports: [HttpClientTestingModule, RouterTestingModule]
     
    })
    component = TestBed.inject(MoviesComponent)
    dataService = TestBed.inject(DataService)
    router = TestBed.inject(Router)
   
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should fetch movie description on imdbID', () => {
     // Espionner la méthode navigate du router
     spyOn(router, 'navigate');

    // Appeler la méthode onDescription avec un ID factice
    const imdbID = 'tt11';
    component.onDescription(imdbID);

    // Vérifier que la méthode navigate a été appelée avec les bons paramètres
    expect(router.navigate).toHaveBeenCalledWith(['/movie', imdbID]);

  })

  it('should fetch movies by title', () => {
    const testData = { 
      Search: [
        { Title : 'Movie1'}
      ]
    }
    component.title = 'Test Title';

    spyOn(dataService, 'getMovies').and.returnValue(of(testData))
    component.ngOnInit()
    expect(component.movies).toEqual(testData.Search)

    // Vérifier que la méthode getMovies a été appelée avec le bon titre
    expect(dataService.getMovies).toHaveBeenCalledWith('Test Title');
  })

});
