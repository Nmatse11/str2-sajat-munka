import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations'
import { Router } from '@angular/router';

@Component({
  selector: 'app-gameend',
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
  templateUrl: './gameend.component.html',
  styleUrls: ['./gameend.component.scss']
})
export class GameendComponent implements OnInit {

  isLoading: boolean = true

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
        this.isLoading = false
        this.router.navigate(['/', 'gameboard'])
    }, 2000)
  }

}
