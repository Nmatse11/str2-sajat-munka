import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss']
})
export class CategoryEditorComponent implements OnInit {

  categoryList: Category[] = []

  disabled: boolean = true;

  update:boolean = true

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      category => this.categoryList = category
    )
  }

  onUpdateCategory(category: Category) {
    category.disabled = false,
    this.update = false
  }

  onCancel(category: Category) {
    category.disabled = true,
    this.update = true
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/', 'editCategory'])}
    )
  }

  onSaveCategory(category: Category) {
    category.disabled = true,
    this.update = true
    this.categoryService.update(category).subscribe(
      category => this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/', 'editCategory'])}
      )
    )
  }

  onDeleteCategory(category: Category) {
    category.disabled = true,
    this.update = true
    this.categoryService.remove(category.id).subscribe(
      category => this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/', 'editCategory'])}
      )
    )

  }

}
