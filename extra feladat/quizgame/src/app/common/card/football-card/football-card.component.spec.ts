import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCardComponent } from './football-card.component';

describe('FootballCardComponent', () => {
  let component: FootballCardComponent;
  let fixture: ComponentFixture<FootballCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootballCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
