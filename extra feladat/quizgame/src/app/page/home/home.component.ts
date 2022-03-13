import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewDialogComponent } from 'src/app/common/dialog/new-dialog/new-dialog.component';
import { StartDialogComponent } from 'src/app/common/dialog/start-dialog/start-dialog.component';
import { Category } from 'src/app/model/category';
import { Player } from 'src/app/model/player';
import { CategoryService } from 'src/app/service/category.service';
import { PlayerService } from 'src/app/service/player.service';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  player: Player = new Player()

  cat: Category[] = []

  ready1: boolean = false
  ready2: boolean = false
  ready3: boolean = false

  constructor(
    private questionService: QuestionService,
    private categoryService: CategoryService,
    private playerService: PlayerService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.numberOfQuestion()
  }

  //Új játék indítása esetén biztonsági kérdés
  onRestart(): void {
    if (!localStorage.getItem('game')) {
      this.playerData()
    } else {
    const confirmDialog = this.dialog.open(NewDialogComponent, {
      data: {
        title: 'Megerősítés',
        message1: 'Biztos vagy benne, hogy új játékot szeretnél kezdni?',
        message2: 'Ha rákattintasz az Igen-re, akkor minden eddig adat és pont elveszik.'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        localStorage.removeItem('game')
        localStorage.removeItem('admin')
        this.playerService.delete(1).subscribe(player => {
        player
        this.playerService.create(this.player).subscribe(player => this.player = player)
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/']);
            })
          })
        } else {(this.router.navigate(['/']))}
      })
    }
  }

  //Új játék indítása
  playerData() {
      const startDialog = this.dialog.open(StartDialogComponent, {
        data: {
          title: 'Kezdődhet a játék?'
        }
      });
      startDialog.afterClosed().subscribe(result => {
        if (result === true) {
          localStorage.setItem('game', 'on')
          this.router.navigate(['/', 'gameboard'])
          } else {(this.router.navigate(['/']))}
    })
  }

  //Minden témakörban lekéri az összes nehézségi szinten az elérhető kérdések számát
  numberOfQuestion() {
    this.categoryService.getAll().subscribe(
      ((categories: Category[]) =>
        this.questionService.getAll().subscribe( questions => {
          categories.forEach( cat => {
            cat.sumOfNumberLevel1 = questions.filter( item => item.disabled === false
              && item.category === cat.name && item.questionlevel === 1).length;
            cat.sumOfNumberLevel2 = questions.filter( item => item.disabled === false
              && item.category === cat.name && item.questionlevel === 2).length;
            cat.sumOfNumberLevel3 = questions.filter( item => item.disabled === false
              && item.category === cat.name && item.questionlevel === 3).length;
            this.saveCategory(cat, cat.sumOfNumberLevel1, cat.sumOfNumberLevel2, cat.sumOfNumberLevel3)
          });
        })
    ), err => console.error(err));
  }

  //Frissíti az adatbázisban a nehézségi szinthez tartozó elérhető kérdések számát
  saveCategory(category: Category, item1: number, item2: number, item3:number) {
      category.sumOfNumberLevel1 = item1
      category.sumOfNumberLevel2 = item2
      category.sumOfNumberLevel3 = item3
      this.categoryService.update(category).subscribe(
        category => category,
        err => console.error(err))
    }

}
