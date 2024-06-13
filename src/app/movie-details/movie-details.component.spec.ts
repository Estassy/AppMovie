import {ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailsComponent } from "./movie-details.component";
import { DataService } from '../data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { inject } from '@angular/core';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let dataService: DataService;
  let router: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieDetailsComponent, 
        DataService,
        {
          provide: ActivatedRoute,// Simulation de l'ActivatedRoute pour les tests
          useValue: {
            params: of({id: '12345'})// Paramètres simulés pour l'URL
          }
        }

      ],
      
      imports: [HttpClientTestingModule, RouterTestingModule]
     
    })
    component = TestBed.inject(MovieDetailsComponent)
    dataService = TestBed.inject(DataService)
    router = TestBed.inject(ActivatedRoute)

    // Espionnage de la méthode getMovieById du DataService pour retourner des données simulées
    spyOn(dataService, 'getMovieById').and.returnValue(of({ Title: 'Test Movie', imdbID: '12345' }));
   
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  
  it('should fetch movie details on iD', () => {
    expect(component.ngOnInit())

    // Vérification que la méthode getMovieById a été appelée avec le bon paramètre
    expect(dataService.getMovieById).toHaveBeenCalledWith('12345');

    // Vérification que la propriété movie a été définie correctement avec les données simulées
    expect(component.movie).toEqual({ Title: 'Test Movie', imdbID: '12345' });
  })

});
