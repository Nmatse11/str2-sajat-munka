import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  newCategory: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  onAddCategory() {
    this.newCategory = true
  }

}
