import { Component, Input, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations'

@Component({
  selector: 'app-start',
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
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})

export class StartComponent implements OnInit {

  @Input() round!: number
  @Input() category!: string
  @Input() hunCategory!: string
  @Input() questionlevel!: string
  @Input() question: string = ''
  @Input() startScore!: number
  @Input() betSize!: number
  @Input() rata!: number
  @Input() win!: number
  @Input() lose!: number
  @Input() bonus!: number

  timer: number = 0

  interval!: any

  constructor( ) { }

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.timer +=1;
    }, 1000)
    setTimeout(() => clearInterval(this.interval), 10000)
  }


}
