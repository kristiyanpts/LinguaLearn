import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherItemComponent } from './teacher-item.component';

describe('TeacherItemComponent', () => {
  let component: TeacherItemComponent;
  let fixture: ComponentFixture<TeacherItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherItemComponent]
    });
    fixture = TestBed.createComponent(TeacherItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
