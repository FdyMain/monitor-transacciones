import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Importamos RouterModule

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule], // Agregamos RouterModule aquí
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  isCollapsed = false;
  showAdminOptions = false;
  user = '@user'; // Propiedad user

  constructor(private readonly router: Router) {} 

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.toggleSidebar.emit();
  }

  toggleAdminOptions(): void {
    this.showAdminOptions = !this.showAdminOptions;
  }

  logout(): void {
    console.log('Cerrando sesión...');
    this.router.navigate(['/login']); // Redirigir al login
  }
}
