import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';

@Component({
  standalone: true,
  imports: [RouterModule, HdWalletMultiButtonComponent],
  selector: 'heavy-duty-camp-root',
  template: `<main
    class="min-h-screen p-4 flex w-screen justify-start items-stretch flex-col gap-5"
    style="background-image: url(assets/background.webp); background-size: cover;"
  >
    <nav
      class="w-full navbar bg-base-100 bg-opacity-50 backdrop-blur text-rose-400 rounded-md box-border shadow"
    >
      <section class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content mt-5 z-[1] p-2 shadow bg-base-100 bg-opacity-70 backdrop-blur rounded-box w-32"
          >
            <li>
              <a [routerLink]="['']">Balance</a>
            </li>
          </ul>
        </div>
      </section>
      <section
        class="navbar-center flex flex-row justify-center items-center gap-4"
      >
        <img
          style="opacity: 0;"
          class="w-12 h-auto flex-none animate-fade-right animate-once animate-duration-[800ms] animate-delay-[600ms] animate-fill-forwards"
          src="assets/heavy.webp"
        />
        <h1
          style="opacity: 0;"
          class="text-4xl font-bold animate-fade-down animate-once animate-duration-[600ms]"
        >
          Heavy Duty Camp
        </h1>
        <img
          style="opacity: 0;"
          class="w-12 h-auto flex-none animate-fade-left animate-duration-[800ms] animate-delay-[600ms] animate-fill-forwards"
          src="assets/solana.webp"
        />
      </section>
      <section class="navbar-end">
        <hd-wallet-multi-button></hd-wallet-multi-button>
      </section>
    </nav>
    <router-outlet></router-outlet>
  </main>`,
})
export class AppComponent {}
