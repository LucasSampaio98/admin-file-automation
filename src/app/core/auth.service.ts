import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null>;
  public token: Observable<string | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
    this.token = this.tokenSubject.asObservable();
  }

  public get tokenValue(): string | null {
    return this.tokenSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/login`, { username, password })
      .pipe(map(response => {
        if (response && response.token) {
          // Armazena o token no localStorage
          localStorage.setItem('token', response.token);
          this.tokenSubject.next(response.token);
        }
        return response;
      }));
  }

  logout(): void {
    // Remove o token do localStorage
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);  // Redireciona para a página de login
  }

  getUserRole(): string | null {
    const token = this.tokenValue;
    if (token) {
      const decodedToken = jwtDecode<{ role: string }>(token);
      return decodedToken.role;
    }
    return null;
  }

  isAuthenticated(): boolean {
    return this.tokenSubject.value !== null;
  }
}
