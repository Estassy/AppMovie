import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of } from 'rxjs';
/**
 * @HttpTestingController
 * permet d'interagir avec le modeule de test @HttpClientTestingModule
 * pour verifer ques des appels sont tentés et pour fournir ddes reponses predefinis
 */
describe('AuthService', () => {
  let service: AuthService
  let httpTestingController: HttpTestingController; // Déclaration du contrôleur de test HTTP
  let dataSericeExcpetion: DataService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, DataService],
      imports: [HttpClientTestingModule],
    })
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController)
    dataSericeExcpetion = TestBed.inject(DataService)
  })

  it('should be created', () => {
    // Vérification que le service a été créé correctement
    expect(service).toBeTruthy();
  })

  afterEach(() => {
    // Vérification qu'il n'y a pas de requêtes HTTP en attente
    httpTestingController.verify();
  })



  it('should fetch login', () => {

    const mockRes = {username: 'testUser'}

    // Espionner la méthode setLoggedIn pour s'assurer qu'elle est appelée
    const setLoggedInSpy = spyOn(service, 'setLoggedIn')

    service.login('test', 'test').subscribe({
        next: (data) => {
            expect(data).toEqual(mockRes)
        },
        error: (err) => {
            fail('Connexion echouée: ' + err.message )
        }
    })

    const req = httpTestingController.expectOne(service.URL)
    expect(req.request.method).toBe('POST')
    req.flush(mockRes)

    // expect(setLoggedInSpy).toHaveBeenCalledWith('testUser');
    // expect(service.loggedIn).toBeTrue();
    // expect(service.username).toBe('testUser');

  })
  it('should handle login error', () => {
    // Espionner la méthode setLoggedIn pour s'assurer qu'elle n'est pas appelée
    const setLoggedInSpy = spyOn(service, 'setLoggedIn')

    service.login('test', 'test').subscribe({
      next: (res) => {
        fail('Login should fail')
      },
      error: (err) => {
        expect(err.message).toBe('incorrect')
      }
    })

    const req = httpTestingController.expectOne(service.URL)
    expect(req.request.method).toBe('POST')
    req.flush(null)

    expect(setLoggedInSpy).not.toHaveBeenCalled()
    expect(service.loggedIn).toBeFalse()
  })

  
  it('should return isLoggedIn status', () => {
    expect(service.isLoggedIn()).toBeFalse()
  })

  
  it('should setLoggedIn status and username', () => {
    service.setLoggedIn('testUser')
    expect(service.loggedIn).toBeTrue()
    expect(service.username).toBe('testUser')
    expect(localStorage.getItem('username')).toBe('testUser')
  })

  it('should handle error', () => {
    const mockErrorResponse = { status: 400, statusText: 'Bad Request' }
    const mockErrorMessage = 'Something went wrong'

    service.login('test', 'test').subscribe({
      next: () => fail('should have failed with 400 error'),
      error: (error) => {
        expect(error.message).toContain('Server error')
      },
    })

    const req = httpTestingController.expectOne(service.URL)
    expect(req.request.method).toEqual('POST')

    req.flush({ message: mockErrorMessage }, mockErrorResponse)

  })

  it('should fetch logout', () => {
    service.logout()
    expect(service.loggedIn).toBeFalse()
    expect(service.username).toBe('')
    expect(localStorage.getItem('username')).toBeNull
  })


});
