import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { BaseService } from './base.service';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<Category> {

  categoriesnames: string[] = ['disney', 'flag', 'football', 'geography', 'grammar', 'history', 'image', 'math', 'movie', 'music', 'poetry']

  constructor(
    public override http: HttpClient
  ) {
    super(http);
    this.entityName = 'category';
  }

  numberOfRound(value1: number, value2: number, value3: number) {
    let numberOflevel1 = (value1 / 5 < 1) ? 0 : 1
    let numberOflevel2 = (value2 / 5 < 1) ? 0 : 1
    let numberOflevel3 = (value3 / 5 < 1) ? 0 : 1
    return numberOflevel1 + numberOflevel2 + numberOflevel3
  }

  roundOfLevel(value: number) {
    return (value / 5 < 1) ? 0 : 1
  }

}
