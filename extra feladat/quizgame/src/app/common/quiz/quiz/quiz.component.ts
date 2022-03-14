import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations'
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-quiz',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]
      ),
      transition(':leave',
        [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]
      )
    ])
  ],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input() questionnumber!: number
  @Input() question: String = ''
  @Input() answers!: any
  @Input() selectedAnswer!: number;
  @Input() correctanswer!: number
  win!: boolean

  @Output() winOrNot: EventEmitter<any> = new EventEmitter()
  @Output() clickOrNot: EventEmitter<any> = new EventEmitter()

  disabled!: boolean
  click: boolean = false

  interval!: any

  timer: number = 10
  end: boolean = false

  table!: boolean
  image!: boolean

  constructor(
    private observer: BreakpointObserver,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    //Számláló
    this.interval = setInterval(() => {
      this.timer--;
    }, 1000)
    //Ha nem történik kattintás
    setTimeout(() => {
      if( this.click === false ) {
      clearInterval(this.interval)
      this.disabled = true;
      this.winOrNot.emit(false)
    }}, 10000)
}

    ngAfterViewInit() {
      //Képernyőmérethez igazítja a kinézetet
      this.observer.observe(['(max-width: 768px)']).subscribe((res) => {
        if (res.matches) {
          this.table = false
        } else {
          this.table = true
        }
      });

      this.cd.detectChanges()
    }

  //Kattintás esemény
    clickHandle(value: number) {
      clearInterval(this.interval)
      this.disabled = true;
      this.click = true;
      (value === this.correctanswer) ? this.win = true :  this.win = false
      this.winOrNot.emit(this.win);
    }

}
