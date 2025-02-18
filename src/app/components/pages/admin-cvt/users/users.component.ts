import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { CreateComponent } from "./create-user/create.component";
import { UpdateComponent } from "./update-user/update.component";
import { DeleteComponent } from "./delete-user/delete.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    CreateComponent,
    UpdateComponent,
    DeleteComponent
],
  templateUrl: './users.component.html'
})
export class UsersComponent {

  activeTab: 'createUser' | 'updateUser' | 'deleteUser' = 'createUser';
  

  setActiveTab(tab: 'createUser' | 'updateUser' | 'deleteUser'): void {
    this.activeTab = tab;
  }

}
