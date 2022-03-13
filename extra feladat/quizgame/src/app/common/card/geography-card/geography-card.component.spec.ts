import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographyCardComponent } from './geography-card.component';

describe('GeographyCardComponent', () => {
  let component: GeographyCardComponent;
  let fixture: ComponentFixture<GeographyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeographyCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeographyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
