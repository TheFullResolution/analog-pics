import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouteName, routeNames } from 'src/app/cms/cms.paths';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit {
  public routes: RouteName[];
  @Output() closeSidenav = new EventEmitter<void>();
  @Input() desktop = false;

  constructor() {
    this.routes = routeNames.filter(el => !el.noSideNav);
  }

  ngOnInit() {
  }

  onClose() {
    if (!this.desktop) {
      this.closeSidenav.emit();
    }
  }
}
