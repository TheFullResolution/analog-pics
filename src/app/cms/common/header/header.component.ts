import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { Store } from '@ngrx/store'
import * as fromCms from '../../state/cms.reducer'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-header-cms',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuth$: Observable<boolean>

  constructor(
    private authService: AuthService,
    private store: Store<fromCms.State>,
  ) {}

  ngOnInit() {
    this.isAuth$ = this.store.select(fromCms.getIsAuth)
  }

  logOut = () => {
    this.authService.logout()
  }
}
