import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HuntextService {

  levelnames: string[] = ['Könnyű', 'Közepes', 'Nehéz']

  ratanumber: number[] = [2, 3, 4]
  ratanames: string[] = ['kétszeresét', 'háromszorosát', 'ötszörösét']

  bonusnumber: number[] = [100, 300, 500]

  constructor() { }
}
