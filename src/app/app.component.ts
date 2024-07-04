import { Component } from '@angular/core';
import { FormComponent } from './ui/form/form.component';
import { ResultComponent } from './ui/result/result.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormComponent, ResultComponent],
  template: `
    <main class="main">
      <app-form />
      <app-result />
    </main>
  `,
  styles: `
    .main {
      background: var(--white-100);
      height: 60.6rem;
      width: 1008px;
      border-radius: 2.4rem;
      overflow: hidden;
      display: flex;
    }
  `,
})
export class AppComponent {}
