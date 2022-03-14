import { OverlayService } from './overlay.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../common/dialog/confirm-dialog/confirm-dialog.component';
import { Question } from '../model/question';
import { BaseService } from './base.service';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends BaseService<Question> {

  constructor(
    public override http: HttpClient,
    public router: Router,
    public dialog: MatDialog,
    private playerService: PlayerService
  ) {
    super(http);
    this.entityName = 'question';
  }

  onSelectQuestion(category: string, level: number, title: string): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Mennyit mersz kockáztatni?',
        category: title,
        level: (level === 1) ? 'Könnyű' : (level === 2) ? 'Közepes' : 'Nehéz',
        winrata: (level === 1) ? 'kétszeresét' : (level === 2) ? 'háromszorosát' : 'ötszörösét',
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.playerService.getOne(1).subscribe(
          player => {
            player.category = category
            player.hunCategory = title
            player.questionlevel = level
          this.playerService.update(player).subscribe(
            player => player)
            this.router.navigate(['/', 'gamestart'])
          }
        )
        }
         else {
           this.router.navigate(['/', 'gameboard'])
          }
    });

  }

}
