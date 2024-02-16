import { Component, inject } from '@angular/core';
import { ShyftApiService } from '../shyft-api.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { NgIf } from '@angular/common';

@Component({
  selector: 'heavy-duty-camp-card-section',
  imports: [NgIf],
  template: `
    <article *ngIf="!solanaBalance() && !accountSilly()" class="mockup-code">
      <pre
        data-prefix="3"
        class="bg-warning text-warning-content"
      ><code>Connecting wallet...</code></pre>
      <pre data-prefix="1"><code>Please, first connect your wallet</code></pre>
    </article>
    <article
      *ngIf="solanaBalance() || accountSilly()"
      class="stats bg-accent text-primary-content overflow-visible"
    >
      @if (!solanaBalance() && !accountSilly()) {
        <p>Please, first connect your wallet</p>
      }
      <div
        *ngIf="solanaBalance()"
        class="stat animate-rotate-x animate-once animate-duration-[600ms] animate-delay-0 animate-normal animate-fill-forwards"
      >
        <div class="stat-figure">
          <div class="avatar">
            <div class="w-16 rounded-full">
              <img src="assets/solana_token.webp" alt="Solana" />
            </div>
          </div>
        </div>
        <div class="stat-title text-slate-700">Solana</div>
        <div class="stat-value text-[#9945ff]">
          {{ solanaBalance()?.balance }} SOL
        </div>
      </div>
      <div
        *ngIf="accountSilly()"
        class="stat animate-rotate-x animate-once animate-duration-[600ms] animate-delay-0 animate-normal animate-fill-forwards"
      >
        <div class="stat-figure text-secondary">
          <div class="avatar">
            <div class="w-16 rounded-full">
              <img [src]="accountSilly()?.info?.image" />
            </div>
          </div>
        </div>
        <div class="stat-title text-slate-700">
          {{ accountSilly()?.info?.name }}
        </div>
        <div class="stat-value text-[#e519f5]">
          {{ accountSilly()?.balance }} {{ accountSilly()?.info?.symbol }}
        </div>
      </div>
    </article>
  `,
  standalone: true,
})
export class BalanceSectionComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly solanaBalance = computedAsync(
    () => this._shyftApiService.getSolanaBalance(this._publicKey()?.toBase58()),
    { requireSync: true },
  );
  readonly accountSilly = computedAsync(
    () =>
      this._shyftApiService.getAccount(
        this._publicKey()?.toBase58(),
        '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs',
      ),
    { requireSync: true },
  );
}
