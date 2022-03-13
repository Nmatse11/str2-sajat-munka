import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-base-card',
  templateUrl: './base-card.component.html',
  styleUrls: ['./base-card.component.scss']
})
export class BaseCardComponent implements OnInit {

  @Input() title!: string;
  @Input() colorClass!: string;
  @Input() correctNumberLevel1!: number;
  @Input() correctNumberLevel2!: number;
  @Input() correctNumberLevel3!: number;
  @Input() questionLevel1status!: boolean;
  @Input() questionLevel2status!: boolean;
  @Input() questionLevel3status!: boolean;
  @Input() level1status!: boolean
  @Input() level2status!: boolean
  @Input() level3status!: boolean

  @Output() questionLevel1: EventEmitter<void> = new EventEmitter();
  @Output() questionLevel2: EventEmitter<void> = new EventEmitter();
  @Output() questionLevel3: EventEmitter<void> = new EventEmitter();

  round!: number
  allOfRound!: number


  constructor(
    private playerService: PlayerService
    ) { }

  ngOnInit(): void {
    this.playerService.getOne(1).subscribe(player => {
      this.round = player.round
      this.allOfRound = player.allOfRound
    })
  }

  //Kattintás esemény kezelése
  onSelectLevel1(): void {
    this.questionLevel1.emit()
  }

  onSelectLevel2(): void {
    this.questionLevel2.emit()
  }

  onSelectLevel3(): void {
    this.questionLevel3.emit()
  }


}
