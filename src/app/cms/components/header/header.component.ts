import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core'
import { AuthService } from '../../services/auth/auth.service'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { CmsState } from '../../state/state.reducer'
import { getIsAuth } from '../../state/state.selectors'

@Component({
  selector: 'app-header-cms',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>()
  @Input() sidenavState: Boolean
  isAuth$: Observable<boolean>

  constructor(
    private authService: AuthService,
    private store: Store<CmsState>,
  ) {}

  ngOnInit() {
    this.isAuth$ = this.store.select(getIsAuth)
  }

  onToggleSideNav = () => {
    this.sidenavToggle.emit()
  }

  logOut = () => {
    this.authService.logout()
  }
}
