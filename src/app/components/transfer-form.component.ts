import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

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
      #form="ngForm"
      (ngSubmit)="onSubmit(form)"
      class="py-4 text-slate-200 flex flex-col justify-start items-stretch gap-2"
    >
      <section class="text-slate-500 w-full max-w-xs">
        <div class="label">
          <span class="label-text">Memo</span>
        </div>
        <input
          type="text"
          name="memo"
          placeholder="Transfer memo"
          class="input w-full max-w-xs bg-transparent placeholder:text-slate-600"
          [ngClass]="{
            'input-primary input-bordered':
              memoControl.valid && memoControl.pristine,
            'input-error input-bordered': !!memoControl.errors
          }"
          [(ngModel)]="model.memo"
          required
          #memoControl="ngModel"
        />
        <div class="label text-xs">
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
        </div>
      </section>
      <section class="text-slate-500 form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Amount</span>
        </div>
        <input
          type="number"
          name="amount"
          placeholder="0.00"
          min="0"
          class="input input-bordered w-full max-w-xs bg-transparent placeholder:text-slate-600"
          [ngClass]="{ 'input-error': !!amountControl.errors }"
          [(ngModel)]="model.amount"
          required
          #amountControl="ngModel"
        />
        <div class="label text-xs">
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
          } @else {
            <span class="label-text-alt text-xs">Max amount available: ??</span>
          }
        </div>
      </section>
      <section class="text-slate-500 form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Receiver</span>
        </div>
        <input
          type="text"
          name="receiverAddr"
          placeholder="Receiver public key"
          class="grow input input-bordered w-full max-w-xs bg-transparent placeholder:text-slate-600"
          [ngClass]="{ 'input-error': !!receiverAddrControl.errors }"
          [(ngModel)]="model.receiverAddr"
          required
          #receiverAddrControl="ngModel"
        />
        <div class="label text-xs">
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
        </div>
      </section>
      <footer>
        <button class="btn" type="submit" [disabled]="form.invalid">
          Send
        </button>
      </footer>
    </form>
  `,
  standalone: true,
  imports: [FormsModule, NgClass],
})
export class TransferFormComponent {
  readonly model: TransferFormModel = {
    memo: undefined,
    amount: undefined,
    receiverAddr: undefined,
  };

  @Output() readonly submitForm = new EventEmitter<TransferFormPayload>();

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
