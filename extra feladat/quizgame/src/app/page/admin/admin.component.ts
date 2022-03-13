import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminDialogComponent } from 'src/app/common/dialog/admin-dialog/admin-dialog.component';
import { DeleteDialogComponent } from 'src/app/common/dialog/delete-dialog/delete-dialog.component';
import { Question } from 'src/app/model/question';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  questionList$: Observable<Question[]> = this.questionService.getAll()
  questionList!: MatTableDataSource<any>;

  categories: string[] = []

  keys: string[] = ['id', 'category', 'questionlevel', 'question', 'disabled']
  columnsArray!: string[]

  numberOfRow: number = 0
  filterStringArray: string[] = []
  filterNumberArray: number[] = []

  result: Question[] = []
  questions: Question[] = []
  selectedQuestions: Question[] = []
  filter: boolean = false
  disabled: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private questionService: QuestionService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
  //Lekérdezi az összes kérdést
    this.questionList$.subscribe(
      result => {
    this.result = result
    this.categories = [...new Set(result.map(item => item.category))]
    })
  //Inaktíválja a kereső gombot
    this.disabled = (this.filterStringArray.length === 0 && this.filterNumberArray.length === 0) ? true : false
  //Ha már bejelentkezett az admin, akkor nem kér újra jelszót
    if (localStorage.getItem('admin') === 'true') {
      this.questionList$.subscribe(
        result => {
      this.result = result
      this.categories = [...new Set(result.map(item => item.category))]
      this.setAdminTable(this.result)
    })
    } else {
    //Első bejelentkezéskor jelszót kér
      this.adminPassword()
    }
  }

  //Jelszó
  adminPassword(): void {
    const confirmDialog = this.dialog.open(AdminDialogComponent, {
      data: {
        message: 'A továbblépéshez meg kell adnod a jelszót:',
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.router.navigate(['/', 'admin'])
        localStorage.setItem('admin', 'true')
        this.setAdminTable(this.result)
      } else {this.router.navigate(['/'])}
    })
  }

  //A tábla legenerálásának paraméteres függvénye
  setAdminTable(array: Question[]) {
        this.questionList = new MatTableDataSource<Question>(array)
        this.questionList.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Sor / lap:';
        this.paginator._intl.nextPageLabel = 'Következő lap';
        this.paginator._intl.previousPageLabel = 'Előző lap';
        this.paginator._intl.lastPageLabel = 'Utolsó lap';
        this.paginator._intl.firstPageLabel = 'Első lap';
        this.numberOfRow = this.questionList.data.length
        this.columnsArray = [...this.keys, 'options'];
  }

  //A checkboxok kattintás esetén lementi a keresi feltételeket
  saveFilterItem(event: any, key: string, category: string | number) {
    if (event === true) {
      (typeof category === 'string') ? this.filterStringArray.push(category as string) : this.filterNumberArray.push(category as number)
      this.filter = (this.filterStringArray.length > 0 && this.filterNumberArray.length > 0) ? true : false
      this.disabled = (this.filterStringArray.length === 0 && this.filterNumberArray.length === 0) ? true : false
    }
    if (event === false) {
      this.filterStringArray = this.filterStringArray.filter(element => element != category)
      this.filterNumberArray = this.filterNumberArray.filter(element => element != category)
      this.filter = (this.filterStringArray.length > 0 && this.filterNumberArray.length > 0) ? true : false
      this.disabled = (this.filterStringArray.length === 0 && this.filterNumberArray.length === 0) ? true : false
    //Ha az összes checkbox újra unckecked lesz, akkor újra az egész adatbázist lekéri
      if (this.filterStringArray.length === 0 && this.filterNumberArray.length === 0) {
        this.questionList$.subscribe(
          result => {
        this.result = result
        this.categories = [...new Set(result.map(item => item.category))]
        this.setAdminTable(this.result)
      })
  }
    }

    if (this.questionList.paginator) {
      this.questionList.paginator.firstPage();
    }
  }

  //Keresés gombra kattintás esetén leszűri a kérdéseket a kiválasztott témakörök és nehézségi szintek alapján
  setFilterArray() {
    this.questions = this.result
    //Ha van témakör kiválasztva
    if (this.filterStringArray.length != 0) {
    let questions1 = this.filterStringArray.map(item =>
    this.questions.filter(question => question.category === item))

      //Ha van nehézségi szint kiválasztva
      if (this.filterNumberArray.length != 0) {
      let questions2 = this.filterNumberArray.map(item => questions1.flat().filter(question => question.questionlevel === item))
      this.selectedQuestions = questions2.flat()
      }
      //Ha nincs nehézségi szint kiválasztva
      else  {
        this.selectedQuestions = questions1.flat()
      }
    }
    //Ha nincs témakör kiválasztva
    else { let questions1 = this.filterNumberArray.map(item =>
      this.questions.filter(question => question.questionlevel === item))
      this.selectedQuestions = questions1.flat()
    }
    //Az új táblázat legenerálása
    this.setAdminTable([...new Set(this.selectedQuestions)])
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
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/', 'admin']);
          },
          err => console.error(err)
         )
        })
      }
    });
  }




}
