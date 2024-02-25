import { Component, inject } from '@angular/core';
import { ShyftApiService } from '../../../shyft-api.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { NgIf } from '@angular/common';
import { TransferModalComponent } from 'src/app/components/transfer-modal.component';

@Component({
  selector: 'heavy-duty-camp-balance-section',
  imports: [NgIf, TransferModalComponent],
  template: `
    <section
      class="text-slate-700 flex flex-col justify-start items-center gap-4"
    >
      <header class="h-[40px]">
        <h1 class="text-4xl font-bold card-title">Current Balance</h1>
      </header>
      <article *ngIf="!solanaBalance() && !accountSilly()" class="mockup-code">
        <pre
          data-prefix="3"
          class="bg-warning text-warning-content"
        ><code>Connecting wallet...</code></pre>
        <pre
          data-prefix="1"
        ><code>Please, first connect your wallet</code></pre>
      </article>
      <article
        *ngIf="solanaBalance()"
        class="stats bg-transparent rounded-2xl w-full text-primary-content overflow-visible"
      >
        <div
          class="stat bg-[#9945ff] rounded-2xl w-full animate-rotate-x animate-once animate-duration-[600ms] animate-delay-0 animate-normal animate-fill-forwards"
        >
          <div class="stat-figure">
            <div class="avatar">
              <div class="w-16 rounded-full">
                <img src="assets/solana_token.webp" alt="Solana" />
              </div>
            </div>
          </div>
          <div class="stat-title text-slate-700">Solana</div>
          <div class="stat-value text-slate-800">
            {{ solanaBalance()?.balance }} SOL
          </div>
        </div>
      </article>
      <article
        *ngIf="accountSilly()"
        class="stats bg-transparent rounded-2xl w-full text-primary-content overflow-visible"
      >
        <div
          class="bg-[#e519f5] stat rounded-2xl w-full animate-rotate-x animate-once animate-duration-[600ms] animate-delay-0 animate-normal animate-fill-forwards"
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
          <div class="stat-value text-slate-800">
            {{ accountSilly()?.balance }} {{ accountSilly()?.info?.symbol }}
          </div>
        </div>
      </article>
      <footer *ngIf="solanaBalance() || accountSilly()">
        <heavy-duty-camp-transfer-modal
          [balance]="accountSilly()?.balance"
        ></heavy-duty-camp-transfer-modal>
      </footer>
    </section>
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
