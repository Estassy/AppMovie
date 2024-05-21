import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  auth = inject(AuthService)
  router = inject(Router)
  
 username!: any

  ngOnInit(): void {
     this.username= this.auth.getUsername()
  
  }
  
  onlogout(){
    this.auth.logout()
    this.router.navigate(['/auth/login'])
  }
  
}
