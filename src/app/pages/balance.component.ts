import { Component } from '@angular/core';
import { BalanceSectionComponent } from '../sections/balance-section.component';

@Component({
  selector: 'heavy-duty-camp-home-page',
  imports: [BalanceSectionComponent],
  template: `<article
    class="page flex-1 w-full flex justify-center items-center"
  >
    <section
      class="w-3/4 h-fit min-h-96 my-auto bg-base-100 bg-opacity-50 backdrop-blur text-slate-300 rounded-md box-border shadow flex flex-col justify-start items-center p-10"
    >
      <header class="h-[40px]">
        <h1 class="text-4xl font-bold card-title">Current Balance</h1>
      </header>
      <heavy-duty-camp-card-section
        class="flex-1 flex flex-col justify-center items-center"
      ></heavy-duty-camp-card-section>
    </section>
  </article>`,
  standalone: true,
})
export class HomePageComponent {}
