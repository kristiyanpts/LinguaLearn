import { Course } from './courseModel';

export interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  image: string;
  role: string;
  courses: Course[];
  __v: number;
}
