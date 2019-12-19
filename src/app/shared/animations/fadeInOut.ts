import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInOut = (endOpacity = 1) =>
  trigger('fadeInOut', [
    transition(':enter', [
      // :enter is alias to 'void => *'
      style({ opacity: 0 }),
      animate(200, style({ opacity: endOpacity })),
    ]),
    transition(':leave', [
      // :leave is alias to '* => void'
      animate(200, style({ opacity: 0 })),
    ]),
  ]);
