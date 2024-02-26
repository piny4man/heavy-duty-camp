import { Component, inject } from '@angular/core';
import { ShyftApiService } from '../../../shyft-api.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'heavy-duty-camp-transactions-section',
  imports: [CommonModule, NgIf, FormsModule],
  template: `
    <section
      class="w-full flex-1 flex flex-col justify-start items-stretch gap-4"
    >
      <header class="h-[40px] flex justify-start items-center gap-2">
        <h1 class="text-4xl font-bold text-slate-700">Transactions</h1>
        <label
          *ngIf="transactions()"
          class="input input-bordered flex items-center gap-2 w-full bg-base-100 bg-opacity-50 backdrop-blur text-slate-200"
        >
          <input
            [(ngModel)]="searchTerm"
            type="text"
            class="grow bg-transparent"
            placeholder="Search transactions using 'From address' or 'Type of transaction'"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-4 h-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </label>
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
                <th>Type</th>
                <th class="max-w-64">From</th>
              </tr>
            </thead>
            <tbody>
              @for (
                transaction of transactionsFiltered;
                track transaction.timestamp
              ) {
                <tr>
                  <td>{{ transaction.timestamp | date: 'short' }}</td>
                  <td>{{ transaction.fee }} SOL</td>
                  <td title="{{ transaction.type }}">
                    {{ transaction.type }}
                  </td>
                  <td
                    class="max-w-64 text-ellipsis"
                    title="{{ transaction.fee_payer }}"
                  >
                    {{ transaction.fee_payer }}
                  </td>
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

  searchTerm = '';

  readonly transactions = computedAsync(
    () => this._shyftApiService.getTransactions(this._publicKey()?.toBase58()),
    { requireSync: true },
  );

  get transactionsFiltered() {
    if (!this.searchTerm.trim()) {
      return this.transactions();
    }
    return this.transactions()?.filter(
      (transaction) =>
        transaction.fee_payer
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        transaction.type.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }
}
