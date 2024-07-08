import { CurrencyPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { Result } from '../../app.component';
import { resultTransitions } from '../../animations/result-transitions';
@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div class="result">
      @if(!result()) {
      <div class="result__empty">
        <img
          src="images/illustration-empty.svg"
          alt="Illustration of calculation tools"
          width="192"
          height="192"
        />
        <h2 class="text text--lg">Results shown here</h2>
        <p class="text text--sm">
          Complete the form and click “calculate repayments” to see what your
          monthly repayments would be.
        </p>
      </div>
      } @else {
      <div class="result__data">
        <div class="result__heading">
          <h2 class="text text--lg">Your results</h2>
          <p class="text text--sm">
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click "calculate
            repayments" again.
          </p>
        </div>

        <div class="result__card">
          <div class="result__monthly">
            <h3 class="text text--sm">Your monthly repayments</h3>
            <p class="text text--xl">
              {{ result()!.monthly | currency : '£' }}
            </p>
          </div>

          <div class="result__total">
            <h3 class="text text--sm">Total you'll repay over the term</h3>
            <p class="text text--lg">{{ result()!.total | currency : '£' }}</p>
          </div>
        </div>
      </div>
      }
    </div>
  `,
  styleUrl: './result.component.scss',
  animations: [resultTransitions],
})
export class ResultComponent {
  result = input.required<Result | null>();
  noResult = computed<boolean>(() => this.result() === null);
}
