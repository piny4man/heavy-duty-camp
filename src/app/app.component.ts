import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { ShyftApiService } from './shyft-api.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';

@Component({
  standalone: true,
  imports: [RouterModule, HdWalletMultiButtonComponent],
  selector: 'heavy-duty-camp-root',
  template: `<main>
    <article
      class="hero min-h-screen"
      style="background-image: url(assets/breakpoint.webp); background-size: cover;"
    >
      <div class="hero-overlay bg-opacity-60"></div>
      <div
        class="hero-content text-center text-neutral-content flex flex-col gap-40"
      >
        <div class="max-w-full w-full flex gap-16 items-center justify-center">
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
          <hd-wallet-multi-button></hd-wallet-multi-button>
          @if (account()) {
            <section class="flex flex-row justify-center items-center gap-4">
              <div class="avatar">
                <div class="w-12 mask mask-hexagon">
                  <img [src]="account()?.info?.image" />
                </div>
              </div>
              <p class="text-2xl">{{ account()?.balance }}</p>
            </section>
          }
        </div>
      </div>
    </article>
  </main>`,
})
export class AppComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
    { requireSync: true },
  );
}
