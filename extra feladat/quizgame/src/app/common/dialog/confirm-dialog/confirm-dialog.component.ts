import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from 'src/app/model/player';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})

export class ConfirmDialogComponent implements OnInit {

  player: Player = new Player()

  score!: number
  betSize!: number

  constructor(
    private playerService: PlayerService,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {   }


     ngOnInit() {
      //A felugró ablak adatainak beállítása
      this.playerService.getOne(1).subscribe(player => {
        this.player = player
        this.score = (player.end_score != 0 && player.round > 1) ? player.end_score : player.start_score
        //Alap beállításként az eddig megszerzett pontok fele a lehetséges tét kezdőértéke
        this.betSize = Math.floor(this.score / 2)
        this.onSave(player)
      }, err => console.error(err))
    }

    //A feltett pontok lementése kattintásra
    onSetBet(event:any) {
      this.betSize = event.value;
      this.onSave(this.player)
    }

    //Az adatbázis frissítése az új adattal
    onSave(player: Player) {
      player.bet = this.betSize
      this.playerService.update(player).subscribe(
        player => player,
        err => console.error(err))
    }

}
