import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesHeaderComponent } from './courses-header.component';

describe('CoursesHeaderComponent', () => {
  let component: CoursesHeaderComponent;
  let fixture: ComponentFixture<CoursesHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesHeaderComponent]
    });
    fixture = TestBed.createComponent(CoursesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
