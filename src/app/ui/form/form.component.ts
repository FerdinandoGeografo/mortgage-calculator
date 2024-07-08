import { Component, inject, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { MortgageType, Result } from '../../app.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [DecimalPipe],
  template: `
    <form class="form" [formGroup]="form" (ngSubmit)="calculate()">
      <div class="form__heading">
        <h1 class="text text--lg">Mortgage Calculator</h1>

        <button type="button" class="btn btn--link" (click)="reset()">
          <span class="text text--sm">Clear All</span>
        </button>
      </div>

      <div class="form__controls">
        <div class="form__control form__control--full">
          <label for="amount" class="text text--sm">Mortgage Amount</label>

          <div class="number">
            <div class="number__affix">
              <span class="text text--md">£</span>
            </div>
            <input
              class="number__input"
              type="text"
              inputmode="numeric"
              id="amount"
              formControlName="amount"
            />
          </div>

          @if (form.controls.amount.touched &&
          form.controls.amount.errors?.['required']) {
          <span class="text text--xs text--error">This field is required</span>
          }
        </div>

        <div class="form__control">
          <label for="term" class="text text--sm">Mortgage Term</label>

          <div class="number">
            <input
              class="number__input"
              type="number"
              inputmode="numeric"
              id="term"
              formControlName="term"
            />
            <div class="number__affix">
              <span class="text text--md">years</span>
            </div>
          </div>

          @if (form.controls.term.touched &&
          form.controls.term.errors?.['required']) {
          <span class="text text--xs text--error">This field is required</span>
          }
        </div>

        <div class="form__control">
          <label for="rate" class="text text--sm">Interest Rate</label>

          <div class="number">
            <input
              class="number__input"
              type="number"
              id="rate"
              formControlName="rate"
              step="0.01"
            />
            <div class="number__affix">
              <span class="text text--md">%</span>
            </div>
          </div>

          @if (form.controls.rate.touched &&
          form.controls.rate.errors?.['required']) {
          <span class="text text--xs text--error">This field is required</span>
          }
        </div>

        <div class="form__control form__control--full">
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

          @if (form.controls.type.touched &&
          form.controls.type.errors?.['required']) {
          <span class="text text--xs text--error">This field is required</span>
          }
        </div>
      </div>

      <button class="btn btn--primary">
        <img
          src="images/icon-calculator.svg"
          width="24"
          height="24"
          alt="Calculator icon"
        />
        <span class="text text--md">Calculate Repayments</span>
      </button>
    </form>
  `,
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  #fb = inject(FormBuilder);
  #decimalPipe = inject(DecimalPipe);

  protected form = this.#fb.group({
    amount: this.#fb.control<string>('', [Validators.required]),
    term: this.#fb.control<number | null>(null, [Validators.required]),
    rate: this.#fb.control<number | null>(null, [Validators.required]),
    type: this.#fb.control<MortgageType | null>(null, [Validators.required]),
  });

  protected onSubmit = output<Result>();
  protected onReset = output();

  ngOnInit(): void {
    this.form.controls.amount.valueChanges.subscribe((amount) => {
      if (!amount) return;

      const formattedAmount = amount.replace(/\D/g, '').replace(/^0/, '');

      this.form.controls.amount.patchValue(
        this.#decimalPipe.transform(formattedAmount, '1.0-2', 'en-EN'),
        { emitEvent: false }
      );
    });

    this.form.controls.term.valueChanges.subscribe((term) => {
      if (!term || term <= 0)
        this.form.controls.term.patchValue(null, { emitEvent: false });

      if (term && term > 50)
        this.form.controls.term.patchValue(50, { emitEvent: false });
    });

    this.form.controls.rate.valueChanges.subscribe((rate) => {
      if (rate === null || rate < 0)
        this.form.controls.rate.patchValue(null, { emitEvent: false });

      if (rate && rate > 100)
        this.form.controls.rate.patchValue(100, { emitEvent: false });
    });

    /* TO REMOVE | SCREENSHOT PURPOSE */
    this.form.setValue({
      amount: '300,000',
      term: 25,
      rate: 5.25,
      type: 'repayments',
    });

    this.calculate();
  }

  protected reset() {
    this.form.reset();
    this.onReset.emit();
  }

  protected calculate() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { amount, term, rate, type } = this.form.value;

    const amountParsed = parseFloat(amount!.replaceAll(',', ''));
    const monthlyTerm = term! * 12;
    const annualRate = rate! / 100;
    const monthlyRate = annualRate / 12;

    let monthlyResult = 0;
    if (type === 'repayments') {
      monthlyResult =
        amountParsed *
        ((monthlyRate * Math.pow(1 + monthlyRate, monthlyTerm)) /
          (Math.pow(1 + monthlyRate, monthlyTerm) - 1));
    } else {
      monthlyResult = (amountParsed * annualRate) / 12;
    }
    monthlyResult &&
      this.onSubmit.emit({
        monthly: monthlyResult,
        total: monthlyResult * monthlyTerm,
      });
  }
}
