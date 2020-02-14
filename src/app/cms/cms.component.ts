import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-cms',
  styleUrls: ['./cms.component.scss'],
  template: `
    <app-sidenav class="mat-typography">
      <main class="main">
        <router-outlet></router-outlet>
      </main>
    </app-sidenav>
  `,
})
export class CmsComponent implements OnInit {
  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.authService.iniAuthListener();
  }
}
