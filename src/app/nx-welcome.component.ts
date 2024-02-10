import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'heavy-duty-camp-nx-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main>
      <article
        class="hero min-h-screen"
        style="background-image: url(assets/breakpoint.webp); background-size: cover;"
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div
          class="hero-content text-center text-neutral-content flex flex-col gap-40"
        >
          <div
            class="max-w-full w-full flex gap-16 items-center justify-center"
          >
            <img
              class="flex-none animate-fade animate-once animate-duration-[800ms] animate-fill-forwards"
              src="assets/heavy.webp"
            />
            <img
              class="flex-none animate-fade-left animate-duration-[800ms] animate-delay-[600ms]"
              src="assets/solana.webp"
            />
          </div>
          <div
            style="opacity: 0;"
            class="animate-fade-up animate-once animate-duration-[600ms] animate-delay-[1600ms] animate-fill-forwards"
          >
            <h1 class="text-5xl font-bold">HeavyDutyBuilders Solana Camp</h1>
          </div>
        </div>
      </article>
    </main>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
