import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-geography-card',
  templateUrl: './geography-card.component.html',
  styleUrls: ['./geography-card.component.scss']
})
export class GeographyCardComponent implements OnInit {

  @Input() category!: Category;
  title!: string;
  categoryname!: string;
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

  @Input() round!: number
  @Input() allOfRound!: number

  constructor(
    private questionService: QuestionService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    //A kategórihoz tartozó elérhető kérdések, nehézségi szintek beállítása
      this.title = this.category.nameHUN
      this.categoryname = this.category.name
      this.level1status = (this.categoryService.roundOfLevel(this.category.sumOfNumberLevel1) === 0) ? false : true
      this.level2status = (this.categoryService.roundOfLevel(this.category.sumOfNumberLevel2) === 0) ? false : true
      this.level3status = (this.categoryService.roundOfLevel(this.category.sumOfNumberLevel3) === 0) ? false : true
      this.questionLevel1status = this.category.usedLevel1
      this.questionLevel2status = this.category.usedLevel2
      this.questionLevel3status = this.category.usedLevel3
      this.correctNumberLevel1 = this.category.winNumberLevel1
      this.correctNumberLevel2 = this.category.winNumberLevel2
      this.correctNumberLevel3 = this.category.winNumberLevel3
  }

  //Kattintás esemény kezelése
  onSelectLevel1(): void {
    this.questionService.onSelectQuestion(this.categoryname, 1, this.title)
  }

  onSelectLevel2(): void {
    this.questionService.onSelectQuestion(this.categoryname, 2, this.title)
  }

  onSelectLevel3(): void {
    this.questionService.onSelectQuestion(this.categoryname, 3, this.title)
  }

}
