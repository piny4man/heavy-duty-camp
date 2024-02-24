import { Component } from '@angular/core';
import { TransferFormComponent, TransferFormPayload } from './transfer-form.component';
import { injectTransactionSender } from '@heavy-duty/wallet-adapter';
import { createTransferInstructions } from '@heavy-duty/spl-utils'

@Component({
  selector: 'heavy-duty-camp-transfer-modal',
  template: `
    <button class="btn btn-neutral" onclick="transfer_modal.showModal()">
      Transfer
    </button>
    <dialog id="transfer_modal" class="modal">
      <div
        class="modal-box bg-base-100 bg-opacity-50 backdrop-blur text-slate-200"
      >
        <header>
          <h3 class="font-bold text-lg">Transfer</h3>
        </header>
        <heavy-duty-camp-transfer-form (submitForm)="onTransfer($event)"></heavy-duty-camp-transfer-form>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  `,
  standalone: true,
  imports: [TransferFormComponent],
})
export class TransferModalComponent {
  private readonly _transactionSender = injectTransactionSender()

  onTransfer(payload: TransferFormPayload) {
    this._transactionSender
      .send(({ publicKey }) => createTransferInstructions({
        memo: payload.memo,
        amount: payload.amount,
        senderAddress: publicKey.toBase58(),
        receiverAddress: payload.receiverAddr,
        mintAddress: '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs',
        fundReceiver: true,
      }))
      .subscribe({
        next: (signature) => console.log(`Signature: ${signature}`),
        error: (err) => console.error(err),
        complete: () => console.info('Transfer ready')
      })
  }
}

