import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Result } from '../../app.component';
import { slideRight } from '../../animations/slide-right';
import { slideLeft } from '../../animations/slide-left';
@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    @if(!result()) {
    <div class="empty">
      <img
        @slideRight
        src="images/illustration-empty.svg"
        alt="Illustration"
        width="192"
        height="192"
      />
      <h2 class="text text--lg" @slideLeft>Results shown here</h2>
      <p @slideRight class="text text--sm">
        Complete the form and click “calculate repayments” to see what your
        monthly repayments would be.
      </p>
    </div>
    } @else {
    <div class="data">
      <div class="data__heading">
        <h2 class="text text--lg">Your results</h2>
        <p class="text text--sm">
          Your results are shown below based on the information you provided. To
          adjust the results, edit the form and click "calculate repayments"
          again.
        </p>
      </div>

      <div class="data__card">
        <div class="data__monthly">
          <h4 class="text text--sm">Your monthly repayments</h4>
          <p class="text text--xl">{{ result()!.monthly | currency : '£' }}</p>
        </div>

        <div class="data__total">
          <h4 class="text text--sm">Total you'll repay over the term</h4>
          <p class="text text--lg">{{ result()!.total | currency : '£' }}</p>
        </div>
      </div>
    </div>
    }
  `,
  styleUrl: './result.component.scss',
  animations: [slideRight, slideLeft],
})
export class ResultComponent {
  result = input<Result | null>();
}
