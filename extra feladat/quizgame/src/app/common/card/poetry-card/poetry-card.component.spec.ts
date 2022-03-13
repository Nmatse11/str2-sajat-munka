import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoetryCardComponent } from './poetry-card.component';

describe('PoetryCardComponent', () => {
  let component: PoetryCardComponent;
  let fixture: ComponentFixture<PoetryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoetryCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoetryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
