import { animate, style, transition, trigger } from '@angular/animations';

export const slideRight = trigger('slideRight', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-100%)' }),
    animate(
      '800ms cubic-bezier(0.68, -0.55, 0.27, 1.75)',
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
  ]),
]);
