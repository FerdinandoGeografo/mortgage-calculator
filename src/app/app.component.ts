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
    :host {
      max-width: 100.8rem;
      margin: 0 auto;
      padding: 4.8rem 0;
    }

    .main {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      background: var(--white-100);
      border-radius: 2.4rem;
      overflow: hidden;
      filter: drop-shadow(0 3.2rem 6.4rem var(--slate-600));
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
