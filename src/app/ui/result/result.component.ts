import { Component } from '@angular/core';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  template: `
    <section class="result">
      @if(true) {
      <h2 class="text text--lg">Your results</h2>
      <p class="text text--sm">
        Your results are shown below based on the information you provided. To
        adjust the results, edit the form and click "calculate repayments"
        again.
      </p>

      <div class="card">
        <div class="card__header">
          <h4 class="text text--sm">Your monthly repayments</h4>
          <p class="text text--xl">£1,797.74</p>
        </div>

        <div class="card__body">
          <h4 class="text text--sm">Total you'll repay over the term</h4>
          <p class="text text--lg">£539,322.94</p>
        </div>
      </div>
      } @else {
      <img src="images/illustration-empty.svg" alt="Illustration" />
      <h2 class="text text--lg">Results shown here</h2>
      <p class="text text--sm">
        Complete the form and click “calculate repayments” to see what your
        monthly repayments would be.
      </p>
      }
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

    .card {
      padding: var(--spacing-400);
      background: var(--black-100);
      border-radius: 8px;
      box-shadow: inset 0 4px 0 0 var(--lime-100);

      &__header, &__body {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      &__header {
        .text--xl { color: var(--lime-100); }
      }

      &__body {

      }
    }
  `,
})
export class ResultComponent {}
