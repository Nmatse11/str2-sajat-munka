import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizboardComponent } from './quizboard.component';

describe('QuizboardComponent', () => {
  let component: QuizboardComponent;
  let fixture: ComponentFixture<QuizboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
