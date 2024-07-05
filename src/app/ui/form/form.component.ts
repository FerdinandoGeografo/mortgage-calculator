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

      <button app-button severity="link">
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

    <button app-button severity="primary" type="submit">
      <img slot="icon" src="images/icon-calculator.svg" />
      <span slot="label" class="text text--md">Calculate Repayments</span>
    </button>
  `,
  styles: `
    :host {
      padding: var(--spacing-500);
      display: inline-grid;
      grid-template-rows: auto 1fr auto;
      gap: var(--spacing-500);

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-400);


        &__item {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-100);
          color: var(--slate-400);

          &--full {
            grid-column: 1 / -1;
          }
        }

        &__box {
          display: flex;
          overflow: hidden;
          border: 1px solid var(--slate-300);
          border-radius: 4px;
          height: 4.8rem;
          transition: all .4s;

          &--radio {
            cursor: pointer;
            padding-inline: var(--spacing-300);
            align-items: center;
            gap: var(--spacing-300);
            color: var(--slate-500);

            label { flex: 1; }

            &:has(.form__input:hover) {
              border-color: var(--lime-100) !important;
            }

            &:has(.form__input:checked) {
              border-color: var(--lime-100);
              background: var(--lime-200);
            }
          }

          &:has(.form__input:hover) {
            border-color: var(--slate-500);
          }

          &:has(.form__input:focus), &:has(.form__input:active) {
            border-color: var(--lime-100);

            .form__prefix {
              background: var(--lime-100);
              color: var(--slate-500);
            }
          }

          &:has(.form__input.ng-invalid) {
            border-color: var(--red-100);

            .form__prefix {
              color: var(--white-100);
              background: var(--red-100);
            }
          }
        }

        &__prefix {
          background: var(--slate-100);
          padding: var(--spacing-150);
          transition: background .4s;
        }

        &__input[type="number"] {
          border: 0 none;
          outline: 0 none;
          font-family: inherit;
          font-size: 1.8rem;
          line-height: 125%;
          font-weight: var(--fw-bold);
          padding-inline: var(--spacing-200);
          flex: 1;
        }

        &__input[type="radio"] {
          appearance: none;
          width: 1.95rem;
          height: 1.95rem;
          background: red;
          border-radius: 50%;
        }
      }
    }
  `,
})
export class FormComponent {
  #fb = inject(FormBuilder);

  form = this.#fb.group({
    amount: [300000, [Validators.required]],
    term: [25, [Validators.required]],
    rate: [5, [Validators.required]],
    type: ['repayments', [Validators.required]],
  });

  onSubmit = output();
}
