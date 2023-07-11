import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersHeaderComponent } from './teachers-header.component';

describe('TeachersHeaderComponent', () => {
  let component: TeachersHeaderComponent;
  let fixture: ComponentFixture<TeachersHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeachersHeaderComponent]
    });
    fixture = TestBed.createComponent(TeachersHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
