import { Category } from 'src/app/model/category';
import { CategoryService } from './../../service/category.service';
import { QuestionService } from 'src/app/service/question.service';
import { PlayerService } from 'src/app/service/player.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/model/question';

@Component({
  selector: 'app-quizboard',
  templateUrl: './quizboard.component.html',
  styleUrls: ['./quizboard.component.scss']
})
export class QuizboardComponent implements OnInit {

  round!: number
  category!: string
  hunCategory!: string
  questionlevel!: string
  questions!: Question[]
  startScore!: number
  betSize!: number
  rata!: number
  win!: number
  lose!: number
  bonus!: number
  question!: string
  answers!: any
  correctanswer!: number
  selectedAnswer!: number;
  winNumberArray: Boolean[] = []
  winNumber!: number
  clickEvent: boolean = false

  isLoading: boolean = true

  questionnumber: number = 1
  questionnum: number = 1

  endOfGame: boolean = false

  interval!: any

  timer: number = 0

  startItem: boolean = true
  questionItem: boolean = false
  quizItem: boolean = false
  resultItem: boolean = false

  click!: boolean
  timeout!: any

  constructor(
    private playerService: PlayerService,
    private questionService: QuestionService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getBasicData()
    //Kezdő képernyő elindítása
    setTimeout(() => {
      this.startItem = false
      this.questionItem = true
      this.questionTime()
    }, 10000)
  }

  //A kiválaszott témakör és nehézségi szint alapján a körhöz szükséges 5 kérdés lementés
  getBasicData() {
    this.playerService.getOne(1).subscribe(player => {
      this.questionService.getAll().subscribe(
        (questions: Question[]) => {
          questions = questions
            .filter(item => item.category === player.category && item.disabled === false && item.questionlevel === player.questionlevel).slice(0, 5)
          //A körhöz szükséges 5 kérdés használtnak jelölése, hogy később már ne kerüljenek sorra
          questions.forEach(item => this.setDisabled(item))

          //Az adott témakör adott nehézségi szintjéhez tartozó boolean frissítése, hogy már ne lehessen újra ezt választani
          this.categoryService.getAll().subscribe(
            (categories: Category[]) => {
              categories = categories.filter(item => item.name === player.category)
              categories.forEach(item => this.setUsed(item, player.questionlevel))

              this.questions = questions

              //Az adott kör alapadatainak lekérése, beállítása
              this.round = player.round
              this.category = player.category
              this.hunCategory = player.hunCategory
              this.questionlevel = (player.questionlevel === 1) ? 'Könnyű' : (player.questionlevel === 2) ? 'Közepes' : 'Nehéz',
                this.startScore = (player.end_score != 0 && player.round > 1) ? player.end_score : player.start_score
              this.betSize = player.bet
              this.rata = (player.questionlevel === 1) ? 2 : (player.questionlevel === 2) ? 3 : 5
              this.bonus = (this.questionlevel === 'Könnyű') ? 100 : (this.questionlevel === 'Közepes') ? 300 : 500
              this.win = this.startScore + this.betSize * this.rata
              this.lose = this.startScore - this.betSize

              this.question = questions[this.questionnumber - 1].question
              this.answers = questions[this.questionnumber - 1].answer
              this.correctanswer = questions[this.questionnumber - 1].correctanswer
              this.isLoading = false
            }, err => console.error(err)
          )
        }
      )
    }
    )
  }

  //A körhöz szükséges 5 kérdés használtnak jelölése, hogy később már ne kerüljenek sorra
  setDisabled(question: Question) {
    question.disabled = true
    this.questionService.update(question).subscribe(
      question => question,
      err => console.error(err)
    )
  }

  //Az adott témakör adott nehézségi szintjéhez tartozó boolean frissítése, hogy már ne lehessen újra ezt választani
  setUsed(category: Category, level: number) {
    category[`usedLevel${level}`] = true
    this.categoryService.update(category).subscribe(
      category => category,
      err => console.error(err)
    )
  }

  //A kérdésre adott válasz kattintás eseményének kezelése
  winOrNot(value: boolean) {
    this.winNumberArray.push(value)
    setTimeout(() => {
      this.questionnumber += 1;
      this.quizItem = false;
      if (this.questionnumber <= 5) {
        this.questionItem = true;
        this.nextQuestionData();
        this.questionTime()
      } else {
        this.questionItem = false;
        this.endOfGame = true }
    }, 4000)
  }

  //Az új kérdés adatainak beállítása
  nextQuestionData() {
    this.question = this.questions[this.questionnumber - 1].question
    this.answers = this.questions[this.questionnumber - 1].answer
    this.correctanswer = this.questions[this.questionnumber - 1].correctanswer
  }

  //Kérdések újra és újra
  questionTime() {
  setTimeout(() => {
    this.questionItem = false
    this.quizItem = true
    }, 5000)
  }


}
