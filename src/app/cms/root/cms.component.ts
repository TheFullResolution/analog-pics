import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-cms',
  styleUrls: ['./cms.component.scss'],
  templateUrl: './cms.component.html',
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
