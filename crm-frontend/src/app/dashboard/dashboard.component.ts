import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../core/services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  users: any[] = [];
  selectedUser: any = null;  
  intervalId: any;

  constructor(private api: ApiService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadUsers();

    // Refrescar tabla cada 5 segundos
    this.intervalId = setInterval(() => {
      this.loadUsers();
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  loadUsers() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No hay token, redirigiendo a login');
      return; // podrías redirigir al login aquí
    }

    this.api.getUsers().subscribe({
      next: (res: any) => {
        console.log('Usuarios:', res);
        // Dependiendo de la respuesta de tu backend, puede ser res.usuarios
        this.users = res.usuarios || res; 
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando usuarios', err);
      }
    });
  }

  eliminarUsuario(id: string) {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.api.deleteUser(id).subscribe({
        next: () => {
          alert('Usuario eliminado');
          this.loadUsers();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  editarUsuario(user: any) {
    this.selectedUser = { ...user }; // copiar usuario
  }

  guardarCambios() {
    this.api.updateUser(this.selectedUser._id, this.selectedUser).subscribe({
      next: () => {
        alert('Usuario actualizado');
        this.selectedUser = null;
        this.loadUsers();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}