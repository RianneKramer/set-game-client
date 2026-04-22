import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutComponent} from './logout/logout.component';
import { JwtDecodeService } from '../../services/jwt-decode.service';
import { UserprofileComponent } from './userprofile/userprofile.component';

@Component({
  selector: 'app-profile',
  imports: [LogoutComponent, UserprofileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  constructor(
    private router: Router,
    private decode: JwtDecodeService,
  ) {}

  ngOnInit() {
    if (!this.decode.validateToken(<string>localStorage.getItem('authToken'))) {
      this.router.navigate(['/login']);
    }
  }
}
