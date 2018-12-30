import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { RouteName, routeNames } from '../../../cms-routing.module'

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit {
  public routes: RouteName[]
  @Output() closeSidenav = new EventEmitter<void>()

  constructor() {
    this.routes = routeNames.filter(el => el.auth)
  }

  ngOnInit() {}

  onClose() {
    this.closeSidenav.emit()
  }
}
