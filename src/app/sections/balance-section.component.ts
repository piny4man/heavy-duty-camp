import { Component, inject } from '@angular/core';
import { ShyftApiService } from '../shyft-api.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';

@Component({
  selector: 'heavy-duty-camp-card-section',
  template: `<div>
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
  </div>`,
  standalone: true,
})
export class BalanceSectionComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
    { requireSync: true },
  );
}
