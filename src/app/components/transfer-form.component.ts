import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  MatDialog,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';

export interface TransferFormModel {
  memo?: string;
  amount?: number;
  receiverAddr?: string;
}

export interface TransferFormPayload {
  memo: string;
  amount: number;
  receiverAddr: string;
}

@Component({
  selector: 'heavy-duty-camp-transfer-form',
  template: `
    <form
      class="p-4 text-slate-200 flex flex-col justify-start items-stretch !gap-4"
      #form="ngForm"
      (ngSubmit)="onSubmit(form)"
      mat-dialog-content
    >
      <section
        class="text-slate-300 w-full flex flex-col justify-start items-stretch gap-2 mb-4"
      >
        <input
          type="text"
          name="memo"
          placeholder="Transfer memo"
          class="input input-primary input-bordered w-full bg-transparent placeholder:text-slate-400"
          [(ngModel)]="model.memo"
          required
          [disabled]="!!isSendingTransfer"
          #memoControl="ngModel"
        />
        <footer class="text-xs">
          @if (
            form.submitted &&
            memoControl.errors &&
            memoControl.errors['required']
          ) {
            <span class="label-text-alt text-[10px] text-red-500"
              >Memo is required</span
            >
          } @else {
            <span class="label-text-alt text-[10px]"
              >Memo of the transfer. Ex: "Camp Airdrop"</span
            >
          }
        </footer>
      </section>
      <section
        class="text-slate-300 w-full flex flex-col justify-start items-stretch gap-2 mb-4"
      >
        <input
          type="number"
          name="amount"
          placeholder="Amount: 0.00"
          min="0"
          max="{{ balance }}"
          class="input input-bordered w-full bg-transparent placeholder:text-slate-400"
          [ngClass]="{ 'input-error': !!amountControl.errors }"
          [(ngModel)]="model.amount"
          [disabled]="!!isSendingTransfer"
          required
          #amountControl="ngModel"
        />
        <!-- TODO: Improve validations, add max validation and something else if needed -->
        <footer class="!text-xs">
          @if (
            form.submitted &&
            amountControl.errors &&
            amountControl.errors['required']
          ) {
            <span class="label-text-alt text-[10px] text-red-500"
              >Amount is required</span
            >
          } @else if (amountControl?.errors?.['min']) {
            <span class="label-text-alt text-[10px] text-red-500"
              >Amount should be greater than 0</span
            >
          } @else if (amountControl?.errors?.['max']) {
            <span class="label-text-alt text-[10px] text-red-500"
              >Amount should be less or equal than {{ balance }}</span
            >
          } @else {
            <span class="label-text-alt text-xs"
              >Max amount available: {{ balance }} SILLY</span
            >
          }
        </footer>
      </section>
      <section
        class="text-slate-300 w-full flex flex-col justify-start items-stretch gap-2"
      >
        <input
          type="text"
          name="receiverAddr"
          placeholder="Receiver public key"
          class="grow input input-bordered w-full bg-transparent placeholder:text-slate-400"
          [ngClass]="{ 'input-error': !!receiverAddrControl.errors }"
          [(ngModel)]="model.receiverAddr"
          [disabled]="!!isSendingTransfer"
          required
          #receiverAddrControl="ngModel"
        />
        <footer class="text-xs">
          @if (
            form.submitted &&
            receiverAddrControl.errors &&
            receiverAddrControl.errors['required']
          ) {
            <span class="label-text-alt text-[10px] text-red-500"
              >Receiver address is required</span
            >
          } @else {
            <span class="label-text-alt text-xs"
              >Address which will receive the transfer. IMPORTANT! Must be
              Solana wallet public key</span
            >
          }
        </footer>
      </section>
      <mat-dialog-actions
        class="w-full flex flex-row-reverse justify-center items-center gap-4"
      >
        <button
          class="btn btn-primary"
          type="submit"
          class="btn btn-primary"
          type="submit"
          [disabled]="form.invalid || !!isSendingTransfer"
        >
          @if (isSendingTransfer) {
            SENDING ...
          } @else {
            Send
          }
        </button>
        <button
          class="btn btn-neutral"
          (click)="onCancelTransfer()"
          [disabled]="isSendingTransfer"
          mat-dialog-close
        >
          Cancel
        </button>
      </mat-dialog-actions>
    </form>
  `,
  standalone: true,
  imports: [FormsModule, NgClass, MatDialogContent, MatDialogActions],
})
export class TransferFormComponent {
  private readonly _matDialog = inject(MatDialog);
  readonly model: TransferFormModel = {
    memo: undefined,
    amount: undefined,
    receiverAddr: undefined,
  };
  @ViewChild('form') form!: NgForm;
  @Input() balance?: number;
  @Input() isSendingTransfer?: boolean;

  @Output() readonly submitForm = new EventEmitter<TransferFormPayload>();

  onCancelTransfer() {
    this._matDialog.closeAll();
    this.form.resetForm();
  }
  onSubmit(form: NgForm) {
    if (
      form.invalid ||
      !this.model.memo ||
      !this.model.amount ||
      !this.model.receiverAddr
    ) {
      console.log('Form is invalid');
    } else {
      this.submitForm.emit({
        memo: this.model.memo,
        amount: this.model.amount,
        receiverAddr: this.model.receiverAddr,
      });
    }
  }
}
