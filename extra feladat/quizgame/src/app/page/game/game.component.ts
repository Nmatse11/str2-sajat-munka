import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { Toplist } from 'src/app/model/toplist';
import { PlayerService } from 'src/app/service/player.service';
import { ToplistService } from 'src/app/service/toplist.service';
import { trigger, transition, style, animate } from '@angular/animations'

@Component({
  selector: 'app-game',
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
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  toplistItem: Toplist = new Toplist()

  categories: Category[] = []

  isLoading: Boolean = false;

  round!: number

  constructor(
    private playerService: PlayerService,
    private toplistService: ToplistService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.gameboard()
  }

  //A játéktábla megjelenítése a kiválasztott vagy random témakörök alapján
  gameboard() {
    this.isLoading = false;
    this.playerService.getOne(1).subscribe(player => {
      this.round = player.round
        this.categories.push(player.cat1)
        this.categories.push(player.cat2)
        this.categories.push(player.cat3)
        this.categories.push(player.cat4)
        this.categories.push(player.cat5)
        this.categories.push(player.cat6)
      }, err => console.error(err)
    )
  }


}
