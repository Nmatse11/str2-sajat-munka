import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { PlayerService } from 'src/app/service/player.service';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-geography-card',
  templateUrl: './geography-card.component.html',
  styleUrls: ['./geography-card.component.scss']
})
export class GeographyCardComponent implements OnInit {

  title!: string;
  category!: string;
  colorClass: string = 'card-header-primary';
  correctNumberLevel1!: number;
  correctNumberLevel2!: number;
  correctNumberLevel3!: number;
  questionLevel1status: boolean = false;
  questionLevel2status: boolean = false;
  questionLevel3status: boolean = false;
  level1status: boolean = true;
  level2status: boolean = true;
  level3status: boolean = true;

  round!: number

  constructor(
    private questionService: QuestionService,
    private categoryService: CategoryService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
  //A kategórihoz tartozó elérhető kérdések, nehézségi szintek frissítése
  this.categoryService.getAll().subscribe(category => category.filter(category => category.name === 'geography')
    .map(category => {

      this.playerService.getOne(1).subscribe(player => {this.round = player.round

        this.title = category.nameHUN
        this.category = category.name
        this.level1status = (this.categoryService.roundOfLevel(category.sumOfNumberLevel1) === 0) ? false : true
        this.level2status = (this.categoryService.roundOfLevel(category.sumOfNumberLevel2) === 0) ? false : true
        this.level3status = (this.categoryService.roundOfLevel(category.sumOfNumberLevel3) === 0) ? false : true
        this.questionLevel1status = category.usedLevel1
        this.questionLevel2status = category.usedLevel2
        this.questionLevel3status = category.usedLevel3
        this.correctNumberLevel1 = category.winNumberLevel1
        this.correctNumberLevel2 = category.winNumberLevel2
        this.correctNumberLevel3 = category.winNumberLevel3
        })
    }))
  }

  //Kattintás esemény kezelése
  onSelectLevel1(): void {
    this.questionService.onSelectQuestion(this.category, 1, this.title)
  }

  onSelectLevel2(): void {
    this.questionService.onSelectQuestion(this.category, 2, this.title)
  }

  onSelectLevel3(): void {
    this.questionService.onSelectQuestion(this.category, 3, this.title)
  }

}
