import { Component, computed, effect, input } from '@angular/core';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  template: `
    <section class="result">
      @if(result()) {
      <div class="result__data">
        <div class="result__head">
          <h2 class="text text--lg">Your results</h2>
          <p class="text text--sm">
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click "calculate
            repayments" again.
          </p>
        </div>

        <div class="card">
          <div class="card__header">
            <h4 class="text text--sm">Your monthly repayments</h4>
            <p class="tesxt text--xl">£1,797.74</p>
          </div>

          <div class="card__body">
            <h4 class="text text--sm">Total you'll repay over the term</h4>
            <p class="text text--lg">£539,322.94</p>
          </div>
        </div>
      </div>
      } @else {
      <div class="result__empty">
        <img src="images/illustration-empty.svg" alt="Illustration" />
        <h2 class="text text--lg">Results shown here</h2>
        <p class="text text--sm">
          Complete the form and click “calculate repayments” to see what your
          monthly repayments would be.
        </p>
      </div>
      }
    </section>
  `,
  styleUrl: './result.component.scss',
})
export class ResultComponent {
  result = input<number>();

  prettyTotal = computed(() => this.result()?.toLocaleString());
  prettyMonthly = computed(() =>
    this.result() ? (this.result()! / 12).toLocaleString() : ''
  );

  constructor() {
    effect(() => console.log('RESULT: ', this.result()));
  }
}
