import { Component } from '@angular/core';
import { BalanceSectionComponent } from './sections/balance-section.component';
import { TransactionsSectionComponent } from './sections/transactions-section.component';

@Component({
  selector: 'heavy-duty-camp-home-page',
  imports: [BalanceSectionComponent, TransactionsSectionComponent],
  template: `<article
    class="page flex-1 w-full flex justify-start items-start gap-8"
  >
    <heavy-duty-camp-balance-section
      class="flex flex-col justify-start items-center"
    ></heavy-duty-camp-balance-section>
    <heavy-duty-camp-transactions-section
      class="flex-1 flex flex-col justify-start items-center"
    ></heavy-duty-camp-transactions-section>
  </article>`,
  standalone: true,
})
export class HomePageComponent {}
