import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = `${environment.apiUrl}/clientes`;
  private token: string | null = localStorage.getItem('token');  // Obtém o token do localStorage

  constructor(private http: HttpClient) {}

  getClients(): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  getClientById(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(`${environment.apiUrl}/cliente/${id}/pastas`, { headers });
  }
}
