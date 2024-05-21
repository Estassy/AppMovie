import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  auth: AuthService = inject(AuthService);
  router: Router = inject(Router);
  username: string = '';
  password: string = '';

  constructor() {}

  ngOnInit(): void {}
  onLogin() {
    console.log('user: ', this.username, ' password:', this.password);
    
    this.auth.login(this.username, this.password).subscribe({
      
      next: (res) => {
        console.log(res)
        console.log('sucess');
        this.router.navigateByUrl('/home');
      },
      complete: () => console.log('Complete'),
      error: (error: Error) => console.log('Error on login', error),
    });
  }
}
