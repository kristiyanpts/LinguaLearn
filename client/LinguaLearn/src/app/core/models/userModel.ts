export interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  image: string;
  role: string;
  courses: string[];
  __v: number;
}
