import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/common/dialog/delete-dialog/delete-dialog.component';
import { Question } from 'src/app/model/question';
import { CategoryService } from 'src/app/service/category.service';
import { HuntextService } from 'src/app/service/huntext.service';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  question!: Question;
  newQuestion: Question = new Question();
  id!: string;

  categories: string[] = []
  huncategories: string[] = []

  answerNumber: number[] = [1, 2, 3, 4]

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private categoryService: CategoryService,
    public huntextService: HuntextService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  //Új vagy már meglévő kérdés szerkesztés esetén már lesz az űrlap adattartalma
    if (this.activatedRoute.snapshot.params['id'] === '0') {
      this.question = this.newQuestion
    }
    else {
      this.activatedRoute.params.pipe(
        switchMap( params => this.questionService.getOne(params['id']))
        ).subscribe(question => this.question = question)
    }
    this.categoryService.getAll().subscribe(categories => categories.map(item => {
      this.categories.push(item.name)
      this.huncategories.push(item.nameHUN)
    }
      ))
  }

  //Frissítés/mentés gomb kattintás esemény
  onUpdate(question: Question): void {
    if (question.id === 0) {
      this.questionService.create(question).subscribe(
        question => {
          this.router.navigate(['/', 'admin']);
        },
        err => console.error(err)
        )
      }
      else {
        this.questionService.update(question).subscribe(
          question => {
            this.router.navigate(['/', 'admin']);
    },
      err => console.error(err)
    )
    }
  }


  //Törlés esetén biztonsági kérdés
  onDelete(question: Question): void {
    const confirmDialog = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Megerősítés',
        message: 'Biztos vagy benne, hogy törölni szeretnéd?'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.questionService.delete(question.id).subscribe(
          question => {
            this.router.navigate(['/', 'admin']);
          },
          err => console.error(err)
        )
      }
    });
  }

}
