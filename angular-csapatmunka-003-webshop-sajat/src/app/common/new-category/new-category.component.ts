import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {

  newCat: Category = new Category()

  @Input() newCategory: boolean = true

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSave(category: Category) {
    this.newCategory = true
    this.categoryService.create(category).subscribe(
      category => this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/', 'editCategory'])}
      )
    )
  }


  onCancel(): void {
    this.newCategory = true
    this.categoryService.getAll()
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/', 'editCategory'])}
    )
  }

}
