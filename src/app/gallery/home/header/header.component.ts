import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <img
        src="assets/header-min_f84hj2_c_scale,w_250.png"
        alt="Picture of Zenit lens"
      />
      <h1>Analog Pics</h1>
      <section class="mat-typography">
        <p>
          Gallery of my analog pictures, taken using Zenit 12xp and Practica
          MTL-5
        </p>
        <p>Project build using Angular 6 and Firebase</p>
      </section>
    </header>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
