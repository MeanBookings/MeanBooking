import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarProfileComponent } from './snack-bar-profile.component';

describe('SnackBarProfileComponent', () => {
  let component: SnackBarProfileComponent;
  let fixture: ComponentFixture<SnackBarProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
