import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly messageSubject = new BehaviorSubject<string>('');
  private readonly statusSubject = new BehaviorSubject<'success' | 'error' | null>(null);
  private readonly showSubject = new BehaviorSubject<boolean>(false);

  getMessage(): Observable<string> {
    return this.messageSubject.asObservable();
  }

  getStatus(): Observable<'success' | 'error' | null> {
    return this.statusSubject.asObservable();
  }

  getShow(): Observable<boolean> {
    return this.showSubject.asObservable();
  }

  showPopup(message: string, status: 'success' | 'error'): void {
    this.messageSubject.next(message);
    this.statusSubject.next(status);
    this.showSubject.next(true);

    setTimeout(() => {
      this.showSubject.next(false);
    }, 3000);
  }
}
