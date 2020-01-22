import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <img
      src="assets/header-min_f84hj2_c_scale,w_250.png"
      alt="Picture of Zenit lens"
    />
    <h1>{{header}}</h1>
  `,
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  @Input() header = 'Analog Pics';
  constructor() {}
}
