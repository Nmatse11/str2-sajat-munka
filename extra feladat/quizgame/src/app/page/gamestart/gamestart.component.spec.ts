import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamestartComponent } from './gamestart.component';

describe('GamestartComponent', () => {
  let component: GamestartComponent;
  let fixture: ComponentFixture<GamestartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamestartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamestartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
