import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisneyCardComponent } from './disney-card.component';

describe('DisneyCardComponent', () => {
  let component: DisneyCardComponent;
  let fixture: ComponentFixture<DisneyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisneyCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisneyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
