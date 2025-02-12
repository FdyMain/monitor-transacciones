import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  // Sólo dejas los módulos que realmente uses
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  // Elimina isSidebarCollapsed y onToggleSidebar si ya no se usan
}
