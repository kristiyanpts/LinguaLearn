import { Component, Input } from '@angular/core';
import { User } from 'src/app/core/models/userModel';

@Component({
  selector: 'app-teacher-item',
  templateUrl: './teacher-item.component.html',
  styleUrls: ['./teacher-item.component.css'],
})
export class TeacherItemComponent {
  @Input() teacherData: User | undefined;
}
