
import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/model/category';
import { Player } from 'src/app/model/player';
import { CategoryService } from 'src/app/service/category.service';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-start-dialog',
  templateUrl: './start-dialog.component.html',
  styleUrls: ['./start-dialog.component.scss']
})
export class StartDialogComponent implements OnInit {

  player: Player = new Player()

  title: string = '';

  roundvalues: number[] = [11, 12, 13, 14, 15, 16, 17, 18]
  values: number[] = [8000, 5000, 3000]
  levelnumber: number[] = [1, 2, 3]
  roundNumber: number = 10
  startScoreArray: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  startScore: number = 3000
  categories: Category[] = []
  randomCatArray: Category[] = []
  cat: Category[] = []
  selectedCat: Category[] = []
  selectedRoundNumber: number = 0
  randomRoundNumber!: number
  numberAllOfRound!: number
  maxRandomRoundNUmber! : number

  step: number = 6
  random: boolean = false
  tooltip: string = ''

  constructor(
    private playerService: PlayerService,
    public categoryService: CategoryService,
    public dialogRef: MatDialogRef<StartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }


  ngOnInit() {
    this.playerService.getOne(1).subscribe(player => this.player = player, err => console.error(err))
    this.onCategory()
  }

  //A témakörök lekérdezése
  onCategory() {
    this.categoryService.getAll().subscribe((categories: Category[]) => {
      categories.forEach(category => this.cat.push(category));
      //Összesen mennyi kört lehet játszani még az összes témakör alapján
      this.numberAllOfRound = this.numberOfAllRound(this.cat);
      //Random választás esetén véletlenszerűen lesz kiválasztva a 6 témakör
      this.maxRandomRoundNUmber = (this.numberAllOfRound < 18) ? this.numberAllOfRound : 18
      this.onRandomCategory()

      //Addig generálja a random témakörökat, amíg a legmagasabb összkör szám össze nem áll belőle
      while (this.randomRoundNumber != this.maxRandomRoundNUmber) {
        this.categories = []
        this.onRandomCategory()
      }
    }
    )
  }

  //Az összes témakörből random 6 témakör kiválasztása
  onRandomCategory() {
    this.randomCatArray = this.cat.sort((a, b) => 0.5 - Math.random()).slice(0, 6);
    this.randomCatArray.forEach(category => {
      category.selected = true
      this.categories.push(category)
    })
    this.randomRoundNumber = this.numberOfAllRound(this.categories)
  }

  //Az összes témakörben elérhető körök száma
  numberOfAllRound(array: Category[]): number {
    return array.map(item => this.categoryService.numberOfRound(item.sumOfNumberLevel1, item.sumOfNumberLevel2, item.sumOfNumberLevel3))
    .reduce((a, b) => a + b)
  }

  //Random témakör választás - checkbox kattintás eseménye
  onSelectRandom(event: any) {
    this.selectedRoundNumber = 0
    this.selectedCat = []
    if (event === false) {
      this.random = false
    }
    if (event === true) {
      this.step = 0
      this.random = true
    }
  }

  //A kiválasztott témakörök checkbox kattintás esemény kezelése
  onSelectCat(event: any, item: number) {
    this.cat.map(item => item.selected = false)
    this.selectedRoundNumber = 0
    if (event === true) {
      this.step++
      this.selectedCat.push(this.cat[item])
      this.selectedRoundNumber = this.numberOfAllRound(this.selectedCat)
    }
    if (event === false) {
      this.step--
      this.selectedCat = this.selectedCat.filter(element => element != this.cat[item])
      this.selectedRoundNumber = this.numberOfAllRound(this.selectedCat)
    }
  }

  //Az adott témakörben elérhető kérdések száma
  //3, ha a könnyű, közepes és nehéz nehézségi szintű kérdésekből is van legalább 5-5 kérdés
  //2 és 1, ha egy vagy kettőt nehézségi szintből már nincs legalább 5 kérdés
  //0, ha egyik nehézségi szintű kérdésekből sincs már legalább 5-5 kérdés
  onNumberOfRound(value: number) {
    return this.categoryService.numberOfRound(this.cat[value].sumOfNumberLevel1,
      this.cat[value].sumOfNumberLevel2,
      this.cat[value].sumOfNumberLevel3)
  }

  //A témakör választásnál a tooltip kiírja az elérhető nehézségi szinteket az adott témakörből
  setTooltip(value: number) {
    if (this.onNumberOfRound(value) != 0) {
      let level1 = (this.cat[value].sumOfNumberLevel1 / 5 >= 1) ? 'Könnyű' : ''
      let level2 = (this.cat[value].sumOfNumberLevel2 / 5 >= 1) ? 'Közepes' : ''
      let level3 = (this.cat[value].sumOfNumberLevel3 / 5 >= 1) ? 'Nehéz' : ''
          return this.tooltip = `${level1} ${level2} ${level3}`
    } else return this.tooltip = ` Elfogytak a kérdések `
  }

  //A kiválasztott témakörök összes kérdés számának kiszámolása
  //Ez határozza meg a játszható körök számát
  //Ez azért fontos, mert legalább 10 körnek megfelelő témakört kell választani
  //Illetve ha már nincs elég kérdés az adatbázisban, akkor ez alapján lehet korlátozni a kiválasztott körök számát
  onSelectRoundNumber(event: any) {
    this.roundNumber = event.target.value
    for (let i = 0; i < Number(this.roundNumber); i++) {
      this.startScoreArray[i] = 0 }
  }

  //A játék nehézségi szintjének kiválasztása
  //Ez befolyásolja azt, hogy a játékos mekkora kezdőpontot kap a játék elején
  onSelectLevel(level: any) {
    this.startScore = this.values[Number(level)-1]
  }

  //A beállított játék adatok elmentése attól függően, hogy random témakörökkel
  //vagy a játékos által választott témakörökkel indul a játék
  onSave(player: Player) {
    player.allOfRound = this.roundNumber
    player.score = this.startScoreArray
    player.start_score = this.startScore
    player.end_score = 0
    player.round = 1
    player.random = this.random
    if (this.random === false) {
      player.cat1 = this.categories[0]
      player.cat2 = this.categories[1]
      player.cat3 = this.categories[2]
      player.cat4 = this.categories[3]
      player.cat5 = this.categories[4]
      player.cat6 = this.categories[5]
    }
    if (this.random === true) {
      this.selectedCat.map(item => item.selected = true)
      player.cat1 = this.selectedCat[0]
      player.cat2 = this.selectedCat[1]
      player.cat3 = this.selectedCat[2]
      player.cat4 = this.selectedCat[3]
      player.cat5 = this.selectedCat[4]
      player.cat6 = this.selectedCat[5]
    }
    this.playerService.update(player).subscribe(
      player => player,
      err => console.error(err))
  }

}
