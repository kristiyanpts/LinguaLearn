import { LessonModel } from 'src/app/core/models/lessonModel';

export function checkDates(
  courseDateString: string,
  lessonDatesObjects: LessonModel[]
): boolean {
  let courseDate: Date = new Date(courseDateString);
  let lessonDates: Date[] = [];
  lessonDatesObjects.forEach((ld) => {
    lessonDates.push(new Date(ld.lessonDate));
  });

  let areLessonDatesValid: boolean = true;
  lessonDates.forEach((ld) => {
    if (courseDate.getTime() >= ld.getTime()) {
      areLessonDatesValid = false;
    }
  });
  return areLessonDatesValid;
}
