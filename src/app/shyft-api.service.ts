import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, of } from 'rxjs';
import { AccountResult } from './types';

@Injectable({ providedIn: 'root' })
export class ShyftApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _header = { 'x-api-key': 'oUstyqtMxTQqyOEO' };
  private readonly _mint = '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs';

  getAccount(publicKey?: string | null) {
    if (!publicKey) return of(null);

    const url = new URL('https://api.shyft.to/sol/v1/wallet/token_balance');
    url.searchParams.append('network', 'mainnet-beta');
    url.searchParams.append('wallet', publicKey);
    url.searchParams.append('token', this._mint);

    return this._httpClient
      .get<AccountResult>(url.toString(), { headers: this._header })
      .pipe(map((res) => res.result));
  }
}
