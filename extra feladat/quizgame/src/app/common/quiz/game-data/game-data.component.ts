import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/model/player';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-game-data',
  templateUrl: './game-data.component.html',
  styleUrls: ['./game-data.component.scss']
})
export class GameDataComponent implements OnInit {

  player: Player = new Player()

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.playerService.getOne(1).subscribe(
      player => this.player = player
      )
  }

}
