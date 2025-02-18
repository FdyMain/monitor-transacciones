import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminUsersService } from '../../../../../services/admin-users/api.admin-users';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationPopupComponent } from '../../../../shared/notification-popup/notification-popup.component';
import { NotificationService } from '../../../../../services/local-services/notification-service/notification-service.component';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NotificationPopupComponent],
  templateUrl: './update-user.component.html'
})
export class UpdateUserComponent {
  userForm: FormGroup;
  searchForm: FormGroup;
  userFound = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly adminUsersService: AdminUsersService,
    private readonly notificationService: NotificationService
  ) {
    this.searchForm = this.fb.group({
      networkUser: ['', Validators.required]
    });

    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      secondLastName: [''],
      role: ['', Validators.required]
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
        this.userForm.patchValue(userData);
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

  onUpdate(): void {
    this.markFormGroupTouched(this.userForm);
  
    if (this.userForm.invalid) {
      console.log('Formulario inválido - No se permite actualizar');
      this.notificationService.showPopup('Debe diligenciar todos los campos obligatorios', 'error');
      return;
    }
  
    console.log('Formulario válido - Enviando actualización');
  
    const userData = this.userForm.value;
    this.adminUsersService.updateUser(this.searchForm.value.networkUser, userData).subscribe({
      next: () => {
        console.log('Usuario actualizado exitosamente');
        this.notificationService.showPopup('Usuario actualizado exitosamente', 'success');
        this.userForm.reset();
        this.searchForm.reset();
        this.userFound = false;
      },
      error: () => {
        console.log('Error al actualizar usuario');
        this.notificationService.showPopup('Error al actualizar el usuario', 'error');
      }
    });
  }
  
  

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      control.updateValueAndValidity(); // Forzar la actualización de los estados de validación
    });
  }
  

}
