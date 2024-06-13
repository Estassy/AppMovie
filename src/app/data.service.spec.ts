import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
/**
 * @HttpTestingController
 * permet d'interagir avec le modeule de test @HttpClientTestingModule
 * pour verifer ques des appels sont tentés et pour fournir ddes reponses predefinis
 */
describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController; // Déclaration du contrôleur de test HTTP

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    // Vérification que le service a été créé correctement
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    // Vérification qu'il n'y a pas de requêtes HTTP en attente
    httpTestingController.verify();
  });

  it('should fetch movies by Title', () => {
    const testData = {
      Search: [{ Title: 'Movie 1' }, { Title: 'Movie 2' }],
    };

    const title = 'test';

    // Appel de la méthode getMovies du service et souscription à l'observable retourné
    service.getMovies(title).subscribe((movies) => {
      // Vérification que les films retournés correspondent aux données de test
      expect(movies).toEqual(testData);
    });

    // Attente d'une seule requête GET avec l'URL spécifiée
    const req = httpTestingController.expectOne(
      `${service.BASE_URL}?s=${title}&apikey=${service.KEY}`
    );
    // Vérification que la méthode de requête est GET
    expect(req.request.method).toEqual('GET');

    // Réponse à la requête avec les données de test
    req.flush(testData);
  });

  it('should fetch a movie by id', () => {
    const testData = { Title: 'Movie 1', Year: '2022' }
    const id = '12345'

    service.getMovieById(id).subscribe((movie) => {
      expect(movie).toEqual(testData)
    })

    const req = httpTestingController.expectOne(
      `${service.BASE_URL}?i=${id}&apikey=${service.KEY}`
    );
    expect(req.request.method).toEqual('GET')

    req.flush(testData);
  })

  //Cas d'erreurrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
  it('hould handle error when fetching movies by title', () => {
    const mockErrorResponse = { status: 400, statusText: 'Bad Request' }
    const mockErrorMessage = 'Something went wrong'

    service.getMovies('test').subscribe({
      next: () => fail('should have failed with 400 error'),
      error: (error) => {
        expect(error.message).toContain('Server error')
      },
    })

    const req = httpTestingController.expectOne(
      `${service.BASE_URL}?s=test&apikey=${service.KEY}`
    )
    expect(req.request.method).toEqual('GET');

    req.flush({ message: mockErrorMessage }, mockErrorResponse)
  })

  it('should handle error when fetching a movie by id', () => {
    const mockErrorResponse = { status: 400, statusText: 'Bad Request' }
    const mockErrorMessage = 'Something went wrong'

    service.getMovieById('12345').subscribe({
      next: () => fail('should have failed with 400 error'),
      error: (error) => {
        expect(error.message).toContain('Server error')
      },
    })

    const req = httpTestingController.expectOne(
      `${service.BASE_URL}?i=12345&apikey=${service.KEY}`
    )
    expect(req.request.method).toEqual('GET')

    req.flush({ message: mockErrorMessage }, mockErrorResponse)
  })
})
