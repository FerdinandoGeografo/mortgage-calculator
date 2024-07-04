import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [],
  template: `
    <div class="header">
      <h1 class="text text--lg">Mortgage Calculator</h1>

      <button class="btn btn--link">
        <span class="text text--sm">Clear All</span>
      </button>
    </div>
    <div></div>

    <button class="btn btn--primary">
      <img src="images/icon-calculator.svg" />
      <span class="text text--md">Calculate Repayments</span>
    </button>
  `,
  styles: `
    :host {
      flex: 1 1 50%;
      padding: var(--spacing-500);
      display: grid;
      grid-template-rows: auto 1fr auto;
      row-gap: var(--spacing-500);

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  `,
})
export class FormComponent {}
