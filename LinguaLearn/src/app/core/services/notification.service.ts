import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastrService: ToastrService) {}

  showNotification(type: string, title: string, message: string): void {
    switch (type) {
      case 'success':
        this.toastrService.success(message, title);
        break;
      case 'info':
        this.toastrService.info(message, title);
        break;
      case 'warning':
        this.toastrService.warning(message, title);
        break;
      case 'error':
        this.toastrService.error(message, title);
        break;
      default:
        this.toastrService.info(message, title);
        break;
    }
  }
}
