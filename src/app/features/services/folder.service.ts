import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FolderService {
    private token: string | null = localStorage.getItem('token');  // Obtém o token do localStorage

    constructor(private http: HttpClient) { }

    uploadToSelectedFolders(clientId: number, folderIds: number[], files: File[]): Observable<any[]> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        const formData: FormData = new FormData();

        Array.from(files).forEach(file => {
            formData.append('files[]', file, file.name);
        });

        // Cria um array de observables, cada um correspondente a uma requisição de upload
        const uploadRequests = folderIds.map(folderId => {
            return this.http.post(`${environment.apiUrl}/cliente/${clientId}/pastas/${folderId}/upload`, formData, { headers });
        });

        // Usa forkJoin para esperar todas as requisições terminarem
        return forkJoin(uploadRequests);
    }

    createAndUploadToFolders(clientId: number, formats: string[], files: File[]): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        const payload = { formats };

        // Agora esperamos um array de IDs ao invés de nomes
        return this.http.post<number[]>(`${environment.apiUrl}/cliente/${clientId}/pastas`, payload, { headers }).pipe(
            switchMap((folderIds: number[]) => {
                // Fazemos o upload para as pastas criadas usando os IDs
                return this.uploadToSelectedFolders(clientId, folderIds, files);
            })
        );
    }
}
