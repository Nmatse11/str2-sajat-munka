import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/model/player';
import { HuntextService } from 'src/app/service/huntext.service';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-game-data',
  templateUrl: './game-data.component.html',
  styleUrls: ['./game-data.component.scss']
})
export class GameDataComponent implements OnInit {

  @Input() player!: Player

  constructor(
    public huntextService: HuntextService
  ) { }

  ngOnInit(): void { }

}
