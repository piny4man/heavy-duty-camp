import { Component } from '@angular/core';
import { TransferFormComponent } from './transfer-form.component';

@Component({
  selector: 'heavy-duty-camp-transfer-modal',
  template: `
    <!-- Open the modal using ID.showModal() method -->
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
        <heavy-duty-camp-transfer-form></heavy-duty-camp-transfer-form>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  `,
  standalone: true,
  imports: [TransferFormComponent],
})
export class TransferModalComponent {}
