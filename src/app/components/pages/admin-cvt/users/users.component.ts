import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { CreateUserComponent } from "./create-user/create-user.component";
import { UpdateUserComponent } from "./update-user/update-user.component";
import { DeleteUserComponent } from "./delete-user/delete-user.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    CreateUserComponent,
    UpdateUserComponent,
    DeleteUserComponent
],
  templateUrl: './users.component.html'
})
export class UsersComponent {

  activeTab: 'createUser' | 'updateUser' | 'deleteUser' = 'createUser';
  

  setActiveTab(tab: 'createUser' | 'updateUser' | 'deleteUser'): void {
    this.activeTab = tab;
  }

}
