import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { NotificationService } from '../../../services/local-services/notification-service/notification-service.component';

@Component({
  selector: 'app-notification-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-popup.component.html'
})
export class NotificationPopupComponent {
  message$: Observable<string>;
  status$: Observable<'success' | 'error' | null>;
  show$: Observable<boolean>;

  constructor(private readonly notificationService: NotificationService) {
    this.message$ = this.notificationService.getMessage();
    this.status$ = this.notificationService.getStatus();
    this.show$ = this.notificationService.getShow();
  }
}

