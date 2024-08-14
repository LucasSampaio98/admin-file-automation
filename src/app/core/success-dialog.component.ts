import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-success-dialog',
    standalone: true,
    template: `
      <div style="padding:20px;">
        <h1 mat-dialog-title>Sucesso</h1>
        <div mat-dialog-content>
        <p>{{ data.message }}</p>
        </div>
        <div mat-dialog-actions>
        <button mat-button mat-dialog-close (click)="onClose()" class="btn btn-primary">Fechar</button>
        </div>
      </div>
  `,
})
export class SuccessDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<SuccessDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { message: string }
    ) { }
    onClose(): void {
        this.dialogRef.close();
    }
}

