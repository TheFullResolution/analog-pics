import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <app-logo></app-logo>
      <section class="mat-typography">
        <p>
          Gallery of my analog pictures, taken using Zenit 12xp and Practica
          MTL-5
        </p>
        Go to <a routerLink="/about" class="about">About Page</a> to read more.
      </section>
      <a routerLink="/cms" class="edit">Edit</a>
    </header>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
