import { Component } from '@angular/core';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  template: `
    <section class="result">
      <img src="images/illustration-empty.svg" alt="Illustration" />

      <h2 class="text text--lg">Results shown here</h2>

      <p class="text text--sm">
        Complete the form and click “calculate repayments” to see what your
        monthly repayments would be.
      </p>
    </section>
  `,
  styles: `
    :host {
      flex: 1 1 50%;
      background: var(--slate-500);
      border-radius: 0 0 0 8rem;
    }

    .result {
      height: 100%;
      padding: 0 var(--spacing-500);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: var(--spacing-200);

      .text--lg {
        color: var(--white-100);
      }

      .text--sm {
        color: var(--slate-200);
      }
    }
  `,
})
export class ResultComponent {}
