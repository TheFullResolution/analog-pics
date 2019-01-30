import { Component, OnInit } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { DatabaseService } from '../services/database.service'

@Component({
  selector: 'app-cms',
  styleUrls: ['./cms.component.scss'],
  templateUrl: './cms.component.html',
})
export class CmsComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private databaseService: DatabaseService,
  ) {}

  ngOnInit() {
    this.authService.iniAuthListener()
  }
}
