import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Result } from '../../app.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="heading">
      <h1 class="text text--lg">Mortgage Calculator</h1>

      <button class="btn btn--link" (click)="form.reset(); this.onClear.emit()">
        <span class="text text--sm">Clear All</span>
      </button>
    </div>

    <form class="form" [formGroup]="form" (ngSubmit)="calculate()">
      <div class="form__item form__item--full">
        <label for="amount" class="text text--sm">Mortgage Amount</label>

        <div class="number">
          <div class="number__affix">
            <span class="text text--md">£</span>
          </div>
          <input
            class="number__input"
            type="number"
            id="amount"
            formControlName="amount"
          />
        </div>
      </div>

      <div class="form__item">
        <label for="term" class="text text--sm">Mortgage Term</label>

        <div class="number">
          <input
            class="number__input"
            type="number"
            id="term"
            formControlName="term"
          />
          <div class="number__affix">
            <span class="text text--md">years</span>
          </div>
        </div>
      </div>

      <div class="form__item">
        <label for="rate" class="text text--sm">Interest Rate</label>

        <div class="number">
          <input
            class="number__input"
            type="number"
            id="rate"
            formControlName="rate"
          />
          <div class="number__affix">
            <span class="text text--md">%</span>
          </div>
        </div>
      </div>

      <div class="form__item form__item--full">
        <span class="text text--sm">Mortgage Type</span>

        <label for="repayments" class="radio">
          <input
            type="radio"
            class="radio__input"
            id="repayments"
            value="repayments"
            formControlName="type"
          />
          <span for="repayments" class="text text--md radio__label"
            >Repayments</span
          >
        </label>

        <label for="interest-only" class="radio">
          <input
            type="radio"
            class="radio__input"
            id="interest-only"
            value="interest-only"
            formControlName="type"
          />
          <span class="text text--md radio__label">Interest Only</span>
        </label>
      </div>
    </form>

    <button class="btn btn--primary" type="submit" (click)="calculate()">
      <img src="images/icon-calculator.svg" />
      <span class="text text--md">Calculate Repayments</span>
    </button>
  `,
  styleUrl: './form.component.scss',
})
export class FormComponent {
  #fb = inject(FormBuilder);

  form = this.#fb.group({
    amount: [300000, [Validators.required]],
    term: [25, [Validators.required]],
    rate: [5.25, [Validators.required]],
    type: ['repayments', [Validators.required]],
  });

  onSubmit = output<Result>();
  onClear = output();

  calculate() {
    if (!this.form.valid) return;
    const { amount, term, rate } = this.form.value;

    const monthTerm = term! * 12;
    const monthRate = rate! / 100 / 12;

    const monthlyResult =
      amount! *
      ((monthRate * Math.pow(1 + monthRate, monthTerm)) /
        (Math.pow(1 + monthRate, monthTerm) - 1));

    this.onSubmit.emit({
      monthly: monthlyResult,
      total: monthlyResult * monthTerm,
    });
  }
}

type MortgageType = 'repayments' | 'interest-only';
