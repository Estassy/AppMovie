import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'movie';
  
  auth = inject(AuthService);

  showHeaderFooter = true;

  constructor(private router: Router) {
    console.log('Passs');
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeaderFooter = event.url !== '/auth/login';
      }
    });
  }
  ngOnInit(): void {
    const username = localStorage.getItem('username')
    console.log(username);
    if (username !== null) {
      this.auth.setLoggedIn(username)
      this.router.navigateByUrl('/home')
    }
    
  }
}
