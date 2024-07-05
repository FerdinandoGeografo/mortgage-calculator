import { Component, computed, input } from '@angular/core';

@Component({
  selector: '[app-button]',
  standalone: true,
  imports: [],
  template: `
    <ng-content select="[slot=icon]"></ng-content>
    <ng-content select="[slot=label]"></ng-content>
  `,
  styleUrl: './button.component.scss',
  host: {
    '[class]': 'btnClasses()',
  },
})
export class ButtonComponent {
  severity = input<'primary' | 'link'>('primary');

  protected btnClasses = computed(() => `btn btn--${this.severity()}`);
}