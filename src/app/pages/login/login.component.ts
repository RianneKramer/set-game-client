import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Logindata } from './loginform/loginform.component';
import { JwtDecodeService } from '../../services/jwt-decode.service';

@Component({
  selector: 'app-login',
  imports: [Logindata],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private decode: JwtDecodeService) {}

  ngOnInit(): void {
    if (this.decode.validateToken(<string>localStorage.getItem('authToken'))) {
      this.router.navigate(['/profile']);
    }
  }
}
