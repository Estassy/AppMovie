import {TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from 'src/app/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let auth: AuthService
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeaderComponent, AuthService],

      imports: [HttpClientTestingModule, RouterTestingModule]
     
    })
    component = TestBed.inject(HeaderComponent)
    auth = TestBed.inject(AuthService)
    router = TestBed.inject(Router)
   
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  });

  it('should logout', () => {

    const navigateSpy = spyOn(router, 'navigate')
    const logoutSpy = spyOn(auth, 'logout')

    component.onlogout()

    expect(logoutSpy).toHaveBeenCalled()
    expect(navigateSpy).toHaveBeenCalledWith(['/auth/login']);
    

  })
});


