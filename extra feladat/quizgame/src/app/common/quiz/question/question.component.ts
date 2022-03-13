import { trigger, transition, style, animate } from '@angular/animations'
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
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
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() question: string = ''
  @Input() questionnumber!: number

  constructor( ) { }

  ngOnInit(): void { }



}
