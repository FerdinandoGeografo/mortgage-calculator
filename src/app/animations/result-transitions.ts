import {
  animate,
  AnimationMetadata,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

const slideInLeft: AnimationMetadata[] = [
  style({ opacity: 0, transform: 'translateX(100%)' }),
  animate(
    '800ms cubic-bezier(0.68, -0.55, 0.27, 1.75)',
    style({ opacity: 1, transform: 'translateX(0)' })
  ),
];

const slideOutLeft: AnimationMetadata[] = [
  animate(
    '800ms cubic-bezier(0.68, -0.55, 0.27, 1.75)',
    style({ opacity: 0, transform: 'translateX(100%)' })
  ),
];

const slideInRight: AnimationMetadata[] = [
  style({ opacity: 0, transform: 'translateX(-100%)' }),
  animate(
    '800ms cubic-bezier(0.68, -0.55, 0.27, 1.75)',
    style({ opacity: 1, transform: 'translateX(0)' })
  ),
];

const slideOutRight: AnimationMetadata[] = [
  animate(
    '800ms cubic-bezier(0.68, -0.55, 0.27, 1.75)',
    style({ opacity: 0, transform: 'translateX(-100%)' })
  ),
];

export const resultTransitions = trigger('resultTransitions', [
  transition('* => true', [
    group([
      query('.result__empty', style({ position: 'fixed' })),
      query('.result__empty > img', slideInLeft),
      query('.result__empty > h2', slideInRight),
      query('.result__empty > p', slideInLeft),
      query('.result__heading', slideOutLeft, { optional: true }),
      query('.result__card', slideOutRight, { optional: true }),
    ]),
  ]),
  transition('true => false', [
    group([
      query('.result__empty', style({ position: 'fixed' })),
      query('.result__empty > img', slideOutLeft),
      query('.result__empty > h2', slideOutRight),
      query('.result__empty > p', slideOutLeft),
      query('.result__heading', slideInLeft),
      query('.result__card', slideInRight),
    ]),
  ]),
]);
