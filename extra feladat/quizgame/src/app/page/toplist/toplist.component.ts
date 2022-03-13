import { Toplist } from './../../model/toplist';
import { ToplistService } from './../../service/toplist.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toplist',
  templateUrl: './toplist.component.html',
  styleUrls: ['./toplist.component.scss']
})
export class ToplistComponent implements OnInit {

  toplistLevel3: Toplist[] = []
  toplistLevel2: Toplist[] = []
  toplistLevel1: Toplist[] = []

  keys: string[] = ['Játékos neve', 'Körök száma', 'Elért pontszám']

  constructor(
    private toplistService: ToplistService
  ) { }

  ngOnInit(): void {
    //Az adott nehézségi szintű játékban szerzett legmagasabb 3 pontszám kiszűrése
    this.toplistService.getAll().subscribe(item => {
      this.toplistLevel1 = item.filter(item => item.level === 'Könnyű').sort((a, b) => b.end_score - a.end_score ).slice(0,3)
      this.toplistLevel2 = item.filter(item => item.level === 'Közepes').sort((a, b) => b.end_score - a.end_score ).slice(0,3)
      this.toplistLevel3 = item.filter(item => item.level === 'Nehéz').sort((a, b) => b.end_score - a.end_score ).slice(0,3)
    })
  }

}
