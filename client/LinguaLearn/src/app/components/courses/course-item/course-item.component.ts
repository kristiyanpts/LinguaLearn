import { Component, Input } from '@angular/core';
import { Course } from 'src/app/core/models/courseModel';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css'],
})
export class CourseItemComponent {
  @Input() courseData: Course | undefined;
}
