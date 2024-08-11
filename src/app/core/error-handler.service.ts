import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {

    constructor(private dialog: MatDialog) { }

    handleError(error: HttpErrorResponse): void {
        let errorMessage = 'Ocorreu um erro desconhecido.';

        if (error.error instanceof ErrorEvent) {
            // Erro do lado do cliente
            errorMessage = `Erro: ${error.error.message}`;
        } else {
            // Erro do lado do servidor

            if (error.status === 401) {
                errorMessage = `Realize o login novamente`;
            } else {
                errorMessage = `Erro ${error.status}: ${error.error.error}`;
            }
        }

        this.dialog.open(ErrorDialogComponent, {
            data: { message: errorMessage }
        });
    }
}
