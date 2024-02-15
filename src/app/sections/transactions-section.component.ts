import { Component, inject } from '@angular/core';
import { ShyftApiService } from '../shyft-api.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'heavy-duty-camp-transactions-section',
  imports: [CommonModule, NgIf],
  template: `
    <section
      class="w-full flex-1 flex flex-col justify-start items-stretch gap-4"
    >
      <header class="h-[40px]">
        <h1 class="text-4xl font-bold text-slate-700">Transactions</h1>
      </header>
      <article
        *ngIf="transactions()"
        class="bg-base-100 bg-opacity-50 backdrop-blur text-slate-200 rounded-md overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="table text-md">
            <thead class="text-slate-300">
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              @for (
                transaction of transactions();
                track transaction.timestamp
              ) {
                <tr>
                  <td>{{ transaction.timestamp | date: 'long' }}</td>
                  <td>{{ transaction.fee }} SOL</td>
                  <td>{{ transaction.fee_payer }}</td>
                  <td>{{ transaction.raw.meta.postTokenBalances[0].owner }}</td>
                </tr>
              } @empty {
                <tr>
                  <td>There are no transactions.</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </article>
    </section>
  `,
  standalone: true,
})
export class TransactionsSectionComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly transactions = computedAsync(
    () => this._shyftApiService.getTransactions(this._publicKey()?.toBase58()),
    { requireSync: true },
  );
}
