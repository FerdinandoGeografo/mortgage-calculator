import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  template: `
    <div class="header">
      <h1 class="text text--lg">Mortgage Calculator</h1>

      <button app-button severity="link" (click)="form.reset()">
        <span slot="label" class="text text--sm">Clear All</span>
      </button>
    </div>

    <form class="form" [formGroup]="form">
      <div class="form__item form__item--full">
        <label for="amount" class="text text--sm">Mortgage Amount</label>

        <div class="form__box">
          <div class="form__prefix">
            <span class="text text--md">£</span>
          </div>
          <input
            type="number"
            id="amount"
            class="form__input"
            formControlName="amount"
          />
        </div>
      </div>

      <div class="form__item">
        <label for="term" class="text text--sm">Mortgage Term</label>

        <div class="form__box">
          <input
            type="number"
            id="term"
            class="form__input"
            formControlName="term"
          />
          <div class="form__prefix">
            <span class="text text--md">years</span>
          </div>
        </div>
      </div>

      <div class="form__item">
        <label for="rate" class="text text--sm">Interest Rate</label>

        <div class="form__box">
          <input
            type="number"
            id="rate"
            class="form__input"
            formControlName="rate"
          />
          <div class="form__prefix">
            <span class="text text--md">%</span>
          </div>
        </div>
      </div>

      <div class="form__item form__item--full">
        <span class="text text--sm">Mortgage Type</span>

        <div class="form__box form__box--radio">
          <input
            type="radio"
            class="form__input"
            id="repayments"
            value="repayments"
            formControlName="type"
          />
          <label for="repayments" class="text text--md">Repayments</label>
        </div>

        <div class="form__box form__box--radio">
          <input
            type="radio"
            class="form__input"
            id="interest"
            value="interest"
            formControlName="type"
          />
          <label for="interest" class="text text--md">Interest Only</label>
        </div>
      </div>
    </form>

    <button app-button severity="primary" type="submit" (click)="calculate()">
      <img slot="icon" src="images/icon-calculator.svg" />
      <span slot="label" class="text text--md">Calculate Repayments</span>
    </button>
  `,
  styleUrl: './form.component.scss',
})
export class FormComponent {
  #fb = inject(FormBuilder);

  form = this.#fb.group({
    amount: [300000, [Validators.required]],
    term: [25, [Validators.required]],
    rate: [5, [Validators.required]],
    type: ['repayments'],
  });

  onSubmit = output<number>();

  calculate() {}
}
