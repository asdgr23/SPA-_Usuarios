import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = 'https://spa-usuarios.onrender.com/api';

  constructor(private http: HttpClient){}

  // ==== Usuarios ====
 getUsers(): Observable<any> {
  const token = localStorage.getItem('token');

  return this.http.get(`${this.API_URL}/usuarios`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  }

  deleteUser(id:string):Observable<any>{
    const token = localStorage.getItem('token');

    return this.http.delete(`${this.API_URL}/usuarios/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  updateUser(id: string, data: any): Observable<any> {
  const token = localStorage.getItem('token');

  return this.http.put(`${this.API_URL}/usuarios/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
      }
    });
  }
  // ==== Auth ====
  login(data : any) : Observable<any>{
    return this.http.post(`${this.API_URL}/auth/login`, data);
  }

  register(data : any) : Observable<any>{
   return this.http.post(`${this.API_URL}/auth/register`, data);
  }
}
