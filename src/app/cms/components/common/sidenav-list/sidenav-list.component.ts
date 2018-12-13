import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { RouteName } from '../../../cms-routing.module'

type Routes = typeof RouteName

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  public routes: Routes
  @Output() closeSidenav = new EventEmitter<void>()

  constructor() {
    this.routes = RouteName
  }

  ngOnInit() {
  }

  onClose() {
    this.closeSidenav.emit()
  }


}
