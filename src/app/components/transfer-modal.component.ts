import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'heavy-duty-camp-transfer-modal',
  template: `
    <!-- Open the modal using ID.showModal() method -->
    <button class="btn btn-neutral" onclick="transfer_modal.showModal()">
      Transfer
    </button>
    <dialog id="transfer_modal" class="modal">
      <div class="modal-box">
        <header>
          <h3 class="font-bold text-lg text-slate-300">Transfer</h3>
        </header>
        <form>
          <p class="py-4 text-slate-400">
            Press ESC key or click outside to close
          </p>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  `,
  standalone: true,
  imports: [FormsModule],
})
export class TransferModalComponent {}
