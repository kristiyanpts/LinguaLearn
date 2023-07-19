import { LessonModel } from './lessonModel';

export interface Course {
  _id?: string;
  name: string;
  image: string;
  level: string;
  capacity: number;
  date: string;
  duration: string;
  description: string;
  schedule: LessonModel[];
  teacher: string;
  students: string[];
}
