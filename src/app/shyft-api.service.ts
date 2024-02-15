import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, of } from 'rxjs';
import { AccountResult, TransactionsResult } from './types';

@Injectable({ providedIn: 'root' })
export class ShyftApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _header = { 'x-api-key': 'oUstyqtMxTQqyOEO' };

  getSolanaBalance(publicKey?: string) {
    if (!publicKey) return of(null);

    const url = new URL('https://api.shyft.to/sol/v1/wallet/balance');
    url.searchParams.append('network', 'mainnet-beta');
    url.searchParams.append('wallet', publicKey);

    return this._httpClient
      .get<AccountResult>(url.toString(), { headers: this._header })
      .pipe(map((res) => res.result));
  }

  getAccount(publicKey?: string | null, mint?: string) {
    if (!publicKey) return of(null);

    const url = new URL('https://api.shyft.to/sol/v1/wallet/token_balance');
    url.searchParams.append('network', 'mainnet-beta');
    url.searchParams.append('wallet', publicKey);
    url.searchParams.append('token', mint ?? '');

    return this._httpClient
      .get<AccountResult>(url.toString(), { headers: this._header })
      .pipe(map((res) => res.result));
  }

  getTransactions(publicKey?: string | null) {
    if (!publicKey) return of(null);

    const url = new URL('https://api.shyft.to/sol/v1/transaction/history');
    url.searchParams.append('network', 'mainnet-beta');
    url.searchParams.append('account', publicKey);
    url.searchParams.append('enable_raw', 'true');

    return this._httpClient
      .get<TransactionsResult>(url.toString(), { headers: this._header })
      .pipe(map((res) => res.result));
  }
}
