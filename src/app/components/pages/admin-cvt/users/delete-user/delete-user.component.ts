import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminUsersService } from '../../../../../services/admin-users/api.admin-users';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../../../services/local-services/notification-service/notification-service.component';
import { NotificationPopupComponent } from '../../../../shared/notification-popup/notification-popup.component';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NotificationPopupComponent],
  templateUrl: './delete-user.component.html'
})
export class DeleteUserComponent {
  searchForm: FormGroup;
  user: any = null;
  userFound = false;
  showConfirmDialog = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly adminUsersService: AdminUsersService,
    private readonly notificationService: NotificationService
  ) {
    this.searchForm = this.fb.group({
      networkUser: ['', Validators.required]
    });
  }

  onSearch(): void {
    if (this.searchForm.invalid) {
      this.notificationService.showPopup('Debe ingresar un usuario de red', 'error');
      return;
    }

    const networkUser = this.searchForm.value.networkUser;
    this.adminUsersService.getUserByNetworkUser(networkUser).subscribe({
      next: (userData) => {
        this.user = userData;
        this.userFound = true;
        this.notificationService.showPopup('Usuario encontrado', 'success');
      },
      error: (error: HttpErrorResponse) => {
        this.userFound = false;
        if (error.status === 404) {
          this.notificationService.showPopup('Usuario de red no encontrado', 'error');
        } else {
          this.notificationService.showPopup('Error al buscar el usuario', 'error');
        }
      }
    });
  }

  confirmDelete(): void {
    this.showConfirmDialog = true;
  }

  cancelDelete(): void {
    this.showConfirmDialog = false;
  }

  onDelete(): void {
    if (!this.user || !this.searchForm.value.networkUser) {
      this.notificationService.showPopup('No hay usuario seleccionado para eliminar', 'error');
      return;
    }

    this.adminUsersService.deleteUser(this.searchForm.value.networkUser).subscribe({
      next: () => {
        this.notificationService.showPopup('Usuario eliminado exitosamente', 'success');
        this.userFound = false;
        this.user = null;
        this.searchForm.reset();
        this.showConfirmDialog = false;
      },
      error: () => {
        this.notificationService.showPopup('Error al eliminar el usuario', 'error');
      }
    });
  }
}
