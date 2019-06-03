import { style, animate, transition, trigger } from '@angular/animations'

export const fadeInOut = 
  trigger('fadeInOut', [
    transition(':enter', [
      // :enter is alias to 'void => *'
      style({ opacity: 0 }),
      animate(200, style({ opacity: 1 })),
    ]),
    transition(':leave', [
      // :leave is alias to '* => void'
      animate(200, style({ opacity: 0 })),
    ]),
  ])
