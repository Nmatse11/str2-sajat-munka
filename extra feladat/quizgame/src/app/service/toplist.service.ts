import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Toplist } from '../model/toplist';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ToplistService extends BaseService<Toplist> {

  constructor(
    public override http: HttpClient
  ) {
    super(http);
    this.entityName = 'toplist';
  }

}
