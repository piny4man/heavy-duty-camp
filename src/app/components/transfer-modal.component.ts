import { Component, Input, inject } from '@angular/core';
import {
  TransferFormComponent,
  TransferFormPayload,
} from './transfer-form.component';
import { injectTransactionSender } from '@heavy-duty/wallet-adapter';
import { createTransferInstructions } from '@heavy-duty/spl-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'heavy-duty-camp-transfer-modal',
  template: `
    <section mat-dialog-container>
      <header mat-dialog-title class="text-center text-slate-200 p-4">
        <h3 class="font-bold text-lg">Transfer</h3>
      </header>
      <heavy-duty-camp-transfer-form
        [balance]="balance"
        (submitForm)="onTransfer($event)"
        [isSendingTransfer]="isSendingTransfer"
      ></heavy-duty-camp-transfer-form>
    </section>
  `,
  standalone: true,
  imports: [TransferFormComponent],
})
export class TransferModalComponent {
  constructor(private _snackBar: MatSnackBar) {}
  private readonly _transactionSender = injectTransactionSender();
  private readonly _matDialog = inject(MatDialog);
  isSendingTransfer = false;

  @Input() balance?: number;

  onTransfer(payload: TransferFormPayload) {
    this._transactionSender
      .send(({ publicKey }) => {
        this.isSendingTransfer = true;
        return createTransferInstructions({
          memo: payload.memo,
          amount: payload.amount * 10 ** 9,
          senderAddress: publicKey.toBase58(),
          receiverAddress: payload.receiverAddr,
          mintAddress: '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs',
          fundReceiver: true,
        });
      })
      .subscribe({
        next: (signature) => console.log(`Signature: ${signature}`),
        error: (err) => {
          console.error(err);
          this.isSendingTransfer = false;
          this._snackBar.open('🚨 Something went wrong', 'Try again');
        },
        complete: () => {
          console.info('Transfer ready');
          this.isSendingTransfer = false;
          this._snackBar.open('✅ Transfer completed', 'Ok');
          setTimeout(() => this._matDialog.closeAll(), 800);
        },
      });
  }
}
