import { Toplist } from '../../../model/toplist';
import { ToplistService } from './../../../service/toplist.service';
import { Category } from 'src/app/model/category';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations'
import { PlayerService } from 'src/app/service/player.service';
import { CategoryService } from 'src/app/service/category.service';
import { OverlayService } from 'src/app/service/overlay.service';

@Component({
  selector: 'app-result',
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
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  toplistItem: Toplist = new Toplist()

  @Input() round!: number
  @Input() category!: string
  @Input() hunCategory!: string
  @Input() questionlevel!: string
  @Input() startScore!: number
  @Input() betSize!: number
  @Input() rata!: number
  rataString!: string
  @Input() win!: number
  @Input() lose!: number
  @Input() bonus!: number
  @Input() winNumberArray: Boolean[] = []
  @Input() winNumber!: number
  endScore!: number

  timer: number = 0
  interval!: any


  constructor(
    private playerService: PlayerService,
    private categoryService: CategoryService,
    private toplistService: ToplistService,
    private router: Router,
    private overlayService: OverlayService
  ) { }

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.timer +=1;
    }, 1000)
    //Helyes válaszok száma
    this.winNumber = this.winNumberArray.filter(item => item === true).length
    this.rataString = (this.rata === 2) ? 'kétszeresét' : (this.rata === 3) ? 'háromszorosát' : 'ötszörösét'
    this.setEndScore()
    this.updateCategoryData(this.winNumber)
    setTimeout(() => {clearInterval(this.interval), this.overlayService.close(), this.router.navigate(['/', 'gameend'])}, 14000)
  }

  //A témakör frissítése a helyes válaszok számával
  updateCategoryData(winNumber: number) {
    let level = (this.rata === 2) ? 1 : (this.rata === 3) ? 2 : 3
    this.categoryService.getAll().subscribe(
      ((categories: Category[]) =>
        categories.filter(item => item.name === this.category)
        .forEach(item => this.setWinNumber(item, level, winNumber))
      )
    )
  }

  //Az adott témakör adott nehézségi szintjén elért helyes válaszok számának lementése
  setWinNumber(category: Category, level: number, winNumber: number) {
    category[`winNumberLevel${level}`] = winNumber
    this.categoryService.update(category).subscribe(
      category => category,
      err => console.error(err)
      )
  }

  //A kör végi adatok generálása
  setEndScore() {
    //A helyes válaszok alapán a pontok elvesztése vagy megnyerése megfelelő szorzóval és esetleges bónusszal
    if (this.winNumber <= 3) {
      this.endScore = this.lose
    }
    if (this.winNumber === 4) {
      this.endScore = this.win
    }
    if (this.winNumber === 5) {
      this.endScore = this.win + this.bonus
    }
    this.playerService.getOne(1).subscribe(player => {
    if (this.winNumber <= 3) {
      player.end_score = this.lose
    }
    if (this.winNumber === 4) {
      player.end_score = this.win
    }
    if (this.winNumber === 5) {
      player.end_score = this.win + this.bonus
    }
    //A kör végi pontszám lementése az adatbázisba
    player.score[player.round-1] = player.end_score
    //A körök számának növelése
    player.round = this.round + 1

    //Az összes lejátszott kör végén a játék megfelelő adatainak lementése a Toplista adatbázisába
    if (player.round > player.allOfRound) {
    this.toplistItem.name = player.name
    this.toplistItem.level = (player.gamelevel === 1) ? 'Könnyű' : (player.gamelevel === 2) ? 'Közepes' : 'Nehéz'
    this.toplistItem.end_score = player.end_score
    this.toplistItem.allOfRound = player.allOfRound
       this.toplistService.create(this.toplistItem).subscribe(toplist => toplist)
    }

    this.playerService.update(player).subscribe(
      player => player,
      err => console.error(err)
    )
    })
  }


}
