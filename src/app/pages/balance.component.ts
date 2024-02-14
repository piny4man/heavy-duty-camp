import { Component } from '@angular/core';
import { BalanceSectionComponent } from '../sections/balance-section.component';

@Component({
  selector: 'heavy-duty-camp-home-page',
  imports: [BalanceSectionComponent],
  template: `<article class="flex-1 w-full flex justify-center items-center">
    <section
      class="card w-9/12 h-96 bg-base-100 bg-opacity-45 backdrop-blur text-rose-400 rounded-md box-border shadow flex justify-center items-center"
    >
      <header>
        <h1 class="text-5xl font-bold card-title">Current Balance</h1>
      </header>
      <heavy-duty-camp-card-section></heavy-duty-camp-card-section>
    </section>
  </article>`,
  standalone: true,
})
export class HomePageComponent {}
