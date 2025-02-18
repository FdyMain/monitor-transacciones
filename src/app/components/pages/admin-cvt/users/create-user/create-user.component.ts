import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminUsersService } from '../../../../../services/admin-users/api.admin-users';
import { CommonModule } from '@angular/common';
import { NotificationPopupComponent } from '../../../../shared/notification-popup/notification-popup.component';
import { NotificationService } from '../../../../../services/local-services/notification-service/notification-service.component';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NotificationPopupComponent],
  templateUrl: './create-user.component.html'
})
export class CreateUserComponent {
  userForm: FormGroup;
 

  constructor(
    private readonly fb: FormBuilder,
    private readonly adminUsersService: AdminUsersService,
    private readonly notificationService: NotificationService
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      secondLastName: [''],
      networkUser: ['', Validators.required],
      role: ['', Validators.required]
    });
  }



  onCreate(): void {
    this.markFormGroupTouched(this.userForm);
  
    if (this.userForm.invalid) {      
      this.notificationService.showPopup('Debe diligenciar todos los campos obligatorios', 'error');
      return;
    }
  
    const userData = this.userForm.value;
    this.adminUsersService.createUser(userData).subscribe({
      next: () => {
        this.notificationService.showPopup('Usuario creado exitosamente', 'success');
        this.userForm.reset();
      },
      error: () => {
        this.notificationService.showPopup('Error al crear el usuario', 'error');
      }
    });
  }
  
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
      control.markAsTouched({ onlySelf: true });
      control.updateValueAndValidity(); // Asegurar que Angular detecte el cambio
    });
  }
  
  
}
