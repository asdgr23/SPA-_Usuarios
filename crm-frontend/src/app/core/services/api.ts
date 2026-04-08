import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // ⚠️ NO poner barra al final
  private API_URL = 'https://spa-usuarios.onrender.com/api';

  constructor(private http: HttpClient) {}

  // ==== Usuarios ====
  getUsers(): Observable<any> {
    const token = localStorage.getItem('token');
    const url = `${this.API_URL}/usuarios`.replace(/([^:]\/)\/+/g, "$1"); // evita doble slash
    return this.http.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  deleteUser(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const url = `${this.API_URL}/usuarios/${id}`.replace(/([^:]\/)\/+/g, "$1");
    return this.http.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  updateUser(id: string, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const url = `${this.API_URL}/usuarios/${id}`.replace(/([^:]\/)\/+/g, "$1");
    return this.http.put(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // ==== Auth ====
  login(data: any): Observable<any> {
    const url = `${this.API_URL}/auth/login`.replace(/([^:]\/)\/+/g, "$1");
    return this.http.post(url, data);
  }

  register(data: any): Observable<any> {
    const url = `${this.API_URL}/auth/register`.replace(/([^:]\/)\/+/g, "$1");
    return this.http.post(url, data);
  }
}