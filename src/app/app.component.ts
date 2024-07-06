import { Component, signal } from '@angular/core';
import { FormComponent } from './ui/form/form.component';
import { ResultComponent } from './ui/result/result.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormComponent, ResultComponent],
  template: `
    <main class="main">
      <app-form (onSubmit)="result.set($event)" (onClear)="result.set(null)" />
      <app-result [result]="result()" />
    </main>
  `,
  styles: `
    @use "../../public/scss/_query-mixin.scss" as mixin;

    :host {
      max-width: 108.8rem;
      margin: 0 auto;
      padding: var(--spacing-600) var(--spacing-500);

      @include mixin.respond(phone) {
        padding: 0;
      }
    }

    .main {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      background: var(--white-100);
      border-radius: 2.4rem;
      overflow: hidden;
      filter: drop-shadow(0 3.2rem 6.4rem var(--slate-600));

      @include mixin.respond(tablet) {
        grid-template-columns: 1fr;
      }

      @include mixin.respond(phone) {
        border-radius: 0;
      }
    }
  `,
})
export class AppComponent {
  result = signal<Result | null>(null);
}

export type Result = {
  monthly: number;
  total: number;
};
