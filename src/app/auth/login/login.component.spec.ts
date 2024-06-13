import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationEnd, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AppComponent } from 'src/app/app.component';

describe('LoginComponent', () => {
  let component: LoginComponent
  let app: AppComponent
  let auth: AuthService
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginComponent, AuthService, AppComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    component = TestBed.inject(LoginComponent)
    app = TestBed.inject(AppComponent)
    auth = TestBed.inject(AuthService)
    router = TestBed.inject(Router)
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  });

  it('should fetch login', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl')
    const logoutSpy = spyOn(auth, 'login').and.returnValue(of({}))

    // Définir des valeurs pour les champs username et password
    component.username = 'Marc'
    component.password = 'pass'

    component.ngOnInit()
    component.onLogin()

    expect(logoutSpy).toHaveBeenCalledWith('Marc', 'pass')

    expect(navigateSpy).toHaveBeenCalledWith('/home')
  })

  it('should update showHeaderFooter on navigation', fakeAsync(() => {
    const navigationEndEvent = new NavigationEnd(1, '/auth/login', '/auth/login');
    const navigateSpy = spyOn(router, 'navigateByUrl');
    spyOn(auth, 'login').and.returnValue(of({}));
    
    // Simulate navigation end event by emitting it through router.events
    (router.events as any).next(navigationEndEvent);

    // Trigger change detection
    tick();

    // Expect showHeaderFooter to be updated accordingly
    expect(app.showHeaderFooter).toBeFalse();
  }));


});
