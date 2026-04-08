import { Component } from '@angular/core';
import { ApiService } from '../core/services/api';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private api: ApiService, private router: Router) {}

  login() {
    const data = { email: this.email, password: this.password };

    this.api.login(data).subscribe({
      next: (res: any) => {
        console.log('Respuesta login:', res);

        if (res.token) {
          // Guardar token en localStorage
          localStorage.setItem('token', res.token);

          // Redirigir al dashboard / tabla de usuarios
          this.router.navigate(['/usuarios']);
        } else {
          alert('No se recibió token del servidor');
        }
      },
      error: (err) => {
        console.error('Error login', err);
        alert('Credenciales incorrectas');
      }
    });
  }
}