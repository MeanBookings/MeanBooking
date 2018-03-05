import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpendingsComponent } from './viewpendings.component';

describe('ViewpendingsComponent', () => {
  let component: ViewpendingsComponent;
  let fixture: ComponentFixture<ViewpendingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpendingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
