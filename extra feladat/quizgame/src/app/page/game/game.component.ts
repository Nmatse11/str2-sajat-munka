import { Category } from './../../model/category';
import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/service/player.service';
import { trigger, transition, style, animate } from '@angular/animations'
import { Player } from 'src/app/model/player';
import { CategoryService } from 'src/app/service/category.service';
import { Router } from '@angular/router';

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

  player!: Player

  categories: Category[] = []
  selectedCategories: Category[] = []

  isLoading: Boolean = false;
  gameOn: Boolean = false

  round!: number
  allOfRound!: number

  constructor(
    private playerService: PlayerService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.gameOn = (!localStorage.getItem('game')) ? false : true
    if (!this.gameOn) { this.router.navigate(['/']) }
    this.gameboard()
  }

  //A játéktábla megjelenítése a kiválasztott vagy random témakörök alapján
  gameboard() {
    this.categoryService.getAll().subscribe((categories: Category[]) => {
        this.categories = categories

      this.playerService.getOne(1).subscribe(player => {
          this.player = player
          this.round = player.round
          this.allOfRound = player.allOfRound
          this.selectedCategories.push(player.cat1)
          this.selectedCategories.push(player.cat2)
          this.selectedCategories.push(player.cat3)
          this.selectedCategories.push(player.cat4)
          this.selectedCategories.push(player.cat5)
          this.selectedCategories.push(player.cat6)

      this.isLoading = false;
      })
      }, err => console.error(err)
    )
  }


}
