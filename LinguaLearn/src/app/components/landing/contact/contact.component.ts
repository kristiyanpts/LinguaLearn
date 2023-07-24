import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  constructor(private notificationService: NotificationService) {}

  submitContact(form: NgForm) {
    form.reset();
    this.notificationService.showNotification(
      'success',
      'Success',
      'Your message has been sent!'
    );
  }
}
