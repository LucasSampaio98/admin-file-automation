import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private token: string | null = localStorage.getItem('token');  // Obtém o token do localStorage

  constructor(private http: HttpClient) { }

  getFilesByFolderId(clientId: number, folderId: number): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any[]>(`${environment.apiUrl}/cliente/${clientId}/pastas/${folderId}/arquivos`, { headers });
  }

  uploadFiles(clientId: number, files: File[]): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const formData: FormData = new FormData();
    files.forEach(file => {
      formData.append('files', file, file.name);
    });

    return this.http.post(`${environment.apiUrl}/cliente/${clientId}/pastas/upload`, formData, { headers });
  }
}
